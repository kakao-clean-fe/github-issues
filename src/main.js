import { MainPage } from './components/page/mainPage';
import { IssueComponent } from './components/page/item/issue';

class App {
  #page = '';
  #rawIssues = [];
  #issueListElement = null;
  #tabs = {
    open: null,
    close: null,
  };

  fetchIssues = () => {
    // 반환값을 받을 Promise 객체 생성
    return new Promise(function (resolve) {
      fetch('../../data-sources/issues.json') // json 파일 읽어오기
        .then(function (response) {
          resolve(response.json()); // 읽어온 데이터를 json으로 변환
        });
    });
  };

  filterIssues = (status) => {
    return pipe(
      (issues) => issues,
      filter((issue) => issue.status === status)
    )(this.#rawIssues);
  };

  renderIssues = (status) => {
    // 기존에 그려진 리스트 비워주기
    this.clearIssues();

    // 상태에 맞게 필터링 한 후
    const filteredIssues = this.filterIssues(status);

    // 렌더링
    filteredIssues.forEach((issue) => {
      const issueComponent = new IssueComponent(issue);
      issueComponent.attatchTo(this.#issueListElement, 'beforeend');
    });
  };

  clearIssues = () => {
    while (this.#issueListElement.firstChild) {
      this.#issueListElement.removeChild(this.#issueListElement.firstChild);
    }
  };

  changeTab = (status) => {
    // 클릭한 탭과 일치하면 하이라이팅, 아니면 제거
    Object.keys(this.#tabs).forEach((key) => {
      if (key === status) {
        this.#tabs[key].classList.add('font-bold');
      } else {
        this.#tabs[key].classList.remove('font-bold');
      }
    });
  };

  constructor(appRoot) {
    this.fetchIssues().then((issues) => {
      this.#rawIssues = issues;

      // 메인 페이지 렌더링
      this.#page = new MainPage(
        this.filterIssues('open').length,
        this.filterIssues('close').length
      );
      this.#page.attatchTo(appRoot);

      // 이슈 리스트 렌더링
      this.#issueListElement = document.querySelector('.issue-list ul');
      this.renderIssues('open'); // 디폴트는 open 상태

      // 이벤트 등록
      this.#tabs.open = document.getElementById('openTab');
      this.#tabs.close = document.getElementById('closedTab');
      this.#tabs.open.addEventListener('click', () => {
        this.renderIssues('open');
        this.changeTab('open');
      });
      this.#tabs.close.addEventListener('click', () => {
        this.renderIssues('close');
        this.changeTab('close');
      });
    });
  }
}

window.onload = () => {
  new App(document.getElementById('app'));
};
