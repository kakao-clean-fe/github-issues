// Components
import { BaseComponent } from '../components/component';
import { IssueItem } from '../components/issue/issueItem';

// Templates
import { getIssueTpl } from '../template/issue';

// Constants
import { issueSelector } from '../constants/selector';

// Api
import IssueApi from '../api/issue';

// Store
import IssueStore, {
  SET_ISSUE_LIST,
  SET_OPEN_COUNT,
  SET_CLOSE_COUNT,
  SET_CURRENT_TAB,
} from '../store/issueStore';

// Utils
import { pipe, filter } from '../utils/fx';
import { findElement } from '../utils/dom';

export default class IssuePage extends BaseComponent {
  constructor($container) {
    super(getIssueTpl());

    this.$container = $container;
  }

  #tabs = {
    open: issueSelector.OPEN_TAB,
    close: issueSelector.CLOSE_TAB,
  };

  initPage = async () => {
    // 데이터 패치
    const issues = await IssueApi.fetchIssues();

    // 페이지 렌더링
    this.attatchTo(this.$container);

    // subscribe 등록
    IssueStore.subscribe(SET_ISSUE_LIST, this.renderIssues);
    IssueStore.subscribe(SET_OPEN_COUNT, this.renderOpenCount);
    IssueStore.subscribe(SET_CLOSE_COUNT, this.renderCloseCount);
    IssueStore.subscribe(SET_CURRENT_TAB, this.renderIssues);

    // action 호출
    IssueStore.dispatch({
      type: SET_ISSUE_LIST,
      payload: issues,
    });
    IssueStore.dispatch({
      type: SET_OPEN_COUNT,
      payload: this.filterIssues('open').length,
    });
    IssueStore.dispatch({
      type: SET_CLOSE_COUNT,
      payload: this.filterIssues('close').length,
    });

    // 이벤트 등록
    Object.keys(this.#tabs).forEach((tabType) => {
      const tab = findElement(this.#tabs[tabType]);

      tab.addEventListener('click', () => {
        IssueStore.dispatch({
          type: SET_CURRENT_TAB,
          payload: tabType,
        });
        this.changeTab(tabType);
      });
    });
  };

  filterIssues = (status) => {
    return pipe(
      (issues) => issues,
      filter((issue) => issue.status === status)
    )(IssueStore.getState().issueList);
  };

  clearIssues = () => {
    while (findElement(issueSelector.ISSUE_LIST).firstChild) {
      findElement(issueSelector.ISSUE_LIST).removeChild(
        findElement(issueSelector.ISSUE_LIST).firstChild
      );
    }
  };

  renderOpenCount = () => {
    const openTab = findElement(issueSelector.OPEN_TAB);
    openTab.innerText = `${IssueStore.getState().openCount} Opens`;
  };

  renderCloseCount = () => {
    const closeTab = findElement(issueSelector.CLOSE_TAB);
    closeTab.innerText = `${IssueStore.getState().closeCount} Closed`;
  };

  renderIssues = () => {
    // 기존에 그려진 리스트 비워주기
    this.clearIssues();

    const filteredIssues = this.filterIssues(IssueStore.getState().currentTab);
    filteredIssues.forEach((issue) => {
      const issueItem = new IssueItem(issue);
      issueItem.attatchTo(findElement(issueSelector.ISSUE_LIST), 'beforeend');
    });
  };

  changeTab = (clickedTab) => {
    // 클릭한 탭과 일치하면 하이라이팅, 아니면 제거
    Object.keys(this.#tabs).forEach((tabType) => {
      const tab = findElement(this.#tabs[tabType]);

      if (tabType === clickedTab) {
        tab.classList.add('font-bold');
      } else {
        tab.classList.remove('font-bold');
      }
    });
  };

  mounted = () => {
    // set tab
    this.changeTab(IssueStore.getState().currentTab);
  };
}
