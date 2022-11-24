type ToastType = 'success' | 'error';

const Toast = () => {
    const templateWidth = 300;

    const createTemplate = (msg: string, type: ToastType = 'success') => {
        const $div = document.createElement('div');
        $div.style.position = 'fixed';
        $div.style.top = '77px';
        $div.style.width = `${templateWidth}px`;
        $div.style.backgroundColor = 'white';
        $div.style.border = `2px solid ${type === 'success' ? 'skyblue' : 'red'}`;
        $div.style.padding = '7px 4px';
        $div.innerHTML = `<p style="text-align:right">${msg}</p>`
        return $div;
    }

    const animate = ($div: HTMLDivElement) => {
        let right = 0;
        const raff = () => {
            if (right > 30) {
                $div.style.right = '30px';
                setTimeout(() => {
                    document.body.removeChild($div);
                    }, 3000);
                return;
            }
            right = right + 7
            $div.style.right = `${right}px`;
            requestAnimationFrame(raff);
        }
        requestAnimationFrame(raff);
    }

    const show = (msg: string, type: ToastType = 'success') => {
        const $tmpl = createTemplate(msg, type);
        document.body.appendChild($tmpl);
        animate($tmpl);
    }

    return { show };
}

export default Toast();