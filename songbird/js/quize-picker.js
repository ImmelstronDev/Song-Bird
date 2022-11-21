import util from "./util.js"


const createQuizePickerMarkup = (quizeNames, changeLangHandler) => {

    const labels = util.createRadioButtons("lang", ["ru", "en"])
    const radioBtnContainer = util.wrapToDivs(["picker-lang-container", "picker-lang"], labels)

    radioBtnContainer.querySelectorAll("input").forEach(btn => {
        
        if(btn.value === localStorage.getItem('lang')) {
            btn.setAttribute("checked", "checked")
        }

        btn.addEventListener("change", (evt) => {
            const currentBtn = evt.target
            let currentLang = localStorage.getItem('lang')


            if(currentBtn.value !== currentLang) {
                localStorage.setItem('lang', currentBtn.value)
                changeLangHandler()
            }
        })
    })

    const btns = util.createBtnWithContent(['control-panel-btn', 'btn'], quizeNames)
    const btnViews = btns.map(btn => {
        const btnView = util.createBtnWithContent(['control-panel-btn-view', 'btn'], ["Gallery"])[0]
        btnView.dataset.name = btn.textContent
        return btnView
    })
    

    const btnContainers = btns.map((btn, index) => {
        const bntView = btnViews[index]
        return util.wrapToDivs(["control-panel-btn-container"], [btn, bntView])
    })

    const ul = util.createUnorderedList(["picker-quiz"], btnContainers)

    const ulContainer = util.wrapToDivs(["picker-quiz-container"], [ul])
    const picker = util.wrapToDivs(["picker", "picker-container"], [radioBtnContainer, ulContainer])

    return picker
}

const addHandlerToQuizeBtn = (markup, cb) => {
    const btns = markup.querySelectorAll(".control-panel-btn")
    btns.forEach(btn => btn.addEventListener('click', (evt) => cb({
        type: 'quiz',
        name: evt.target.textContent
    })))

    const btnViews = markup.querySelectorAll('.control-panel-btn-view')
    btnViews.forEach(btn =>  btn.addEventListener('click', (evt) => cb({
        type: 'gallery',
        name: evt.target.dataset.name
    })))
}

const createQuizePicker = (quizeNames, cb, changLangHandler) => {
    console.log(quizeNames, cb, changLangHandler)
    const markup = createQuizePickerMarkup(quizeNames, changLangHandler)
    addHandlerToQuizeBtn(markup, cb)
    return markup
}

export default createQuizePicker