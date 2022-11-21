
const removeAllChildren = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const addClassesToElement = (element, classes) => {
    if(!classes) {
        return
    }
    classes.forEach((className) => element.classList.add(className))
}

const createUnorderedList = (classes, elements, itemContainerClasses) => {
    const ul = document.createElement('ul')
    addClassesToElement(ul, classes)

    if(elements) {
        elements.forEach(element => {
            const li = document.createElement('li')
            addClassesToElement(li, itemContainerClasses)
            li.appendChild(element)
            ul.appendChild(li)
        })
    }
    return ul
}

const createElementWithContent = (elementName, classes, content) => {
    const element = document.createElement(elementName)
    element.textContent = content
    addClassesToElement(element, classes)
    return element
}

const createBtnWithContent = (classes, btnContents) => {
    return btnContents.map(item => createElementWithContent("button", classes, item))
}

const createBtns = (count, btnClasses) => {
    const btns = []

    for(let i = 0; i < count; i++) {
        const btn = document.createElement("button")
        addClassesToElement(btn, btnClasses)
        btns.push(btn)
    }

    return btns
}

const createAudio = (src, classes) => {
    const createAudio = document.createElement('audio')
    createAudio.setAttribute('controls', 'controls')
    createAudio.src = src
    addClassesToElement(createAudio, classes)
    return createAudio
}

const createCustomAudioPlayerMarkup = (src) => {
    const audioContainerDiv = document.createElement('div');
    audioContainerDiv.classList.add('audio-container');


    const playButtonDiv = document.createElement('div');
    playButtonDiv.classList.add('play-button');
    const playImg = document.createElement('img');
    playImg.src = 'img/play_green_button_icon_227849.svg';
    playImg.classList.add('play');
    const pauseImg = document.createElement('img');
    pauseImg.src = 'img/pause_green_button_icon_227843.svg';
    pauseImg.classList.add('pause', 'hidden');

    const progressBarDiv = document.createElement('div');
    progressBarDiv.classList.add('progress-bar');
    const progressInput = document.createElement('input');
    progressInput.setAttribute('type', 'range');
    progressInput.setAttribute('max', '100');
    progressInput.setAttribute('name', 'time-bar');
    progressInput.classList.add('timebar')
    const viewTimeDiv = document.createElement('div');
    viewTimeDiv.classList.add('view-time');
    const currentTimeContainerDiv = document.createElement('div');
    currentTimeContainerDiv.classList.add('current-time-container');
    const currentTimeSpan = document.createElement('span');
    currentTimeSpan.classList.add('current-time');
    const durationContainerDiv = document.createElement('div');
    durationContainerDiv.classList.add('duration-container');
    const durationTimeSpan = document.createElement('span');
    durationTimeSpan.classList.add('duration');

    const volumeBarDiv = document.createElement('div');
    volumeBarDiv.classList.add('volume-bar');
    const volumeImg = document.createElement('img');
    volumeImg.src = 'img/free-icon-volume-up-4340178.png'
    volumeImg.classList.add('volume-img')
    const volumeInput = document.createElement('input');
    volumeInput.setAttribute('type', 'range');
    volumeInput.setAttribute('max', '100');
    volumeInput.setAttribute('name', 'volume');
    volumeInput.classList.add('volume');

    const audioTagSrc = document.createElement('audio');
    audioTagSrc.src = src;
    audioTagSrc.setAttribute('controls', 'controls');
    audioTagSrc.classList.add('audio-tag', 'hidden')

    playButtonDiv.appendChild(playImg);
    playButtonDiv.appendChild(pauseImg);

    currentTimeContainerDiv.appendChild(currentTimeSpan);
    durationContainerDiv.appendChild(durationTimeSpan);
    viewTimeDiv.appendChild(currentTimeContainerDiv);
    viewTimeDiv.appendChild(durationContainerDiv);
    progressBarDiv.appendChild(progressInput);
    progressBarDiv.appendChild(viewTimeDiv);

    volumeBarDiv.appendChild(volumeImg);
    volumeBarDiv.appendChild(volumeInput);

    audioContainerDiv.appendChild(playButtonDiv);
    audioContainerDiv.appendChild(progressBarDiv);
    audioContainerDiv.appendChild(volumeBarDiv);
    audioContainerDiv.appendChild(audioTagSrc);

    return audioContainerDiv
}

const createTextNode = (text) => {
    const textNode = document.createTextNode(text)
    return textNode
}

const createParagraph = (elements, classes) => {
    const p = document.createElement("p")
    elements.forEach(item => p.appendChild(item))
    addClassesToElement(p, classes)
    return p
}

const wrapToDivs = (classes, elements) => {
    let outer = null
    for(let i = classes.length - 1; i >= 0; i--) {
        const className = classes[i]
        const div = document.createElement("div")
        addClassesToElement(div, [className])
        if (outer) {
            div.appendChild(outer)
        } else {
            elements.forEach(element => div.appendChild(element))
        }
        outer = div
    }
    return outer
} 

const createImage = (src, classes) => {
    const image = document.createElement("img")
    addClassesToElement(image, classes)
    image.src = src
    return image
}

const createSpan = (text, classes) => {
    const span = document.createElement("span")
    span.textContent = text
    addClassesToElement(span, classes)
    return span
}

const createRadioButtons = (name, values) => {
    const radioButtons = []
    values.forEach(value => {
        const label = document.createElement("label")
        const radioBtn = document.createElement("input")
        
        label.textContent = value

        radioBtn.setAttribute("type", "radio")
        radioBtn.setAttribute("value", value)
        radioBtn.setAttribute("name", name)
        
        label.appendChild(radioBtn)
        radioButtons.push(label)
    })

    return radioButtons
}

const findElementByClass = (element, className) => {
    return findAllElementsByClass(element, className)[0]
}

const findAllElementsByClass = (element, className) => {
    return element.querySelectorAll("." + className)
}

const filterQuizDataByLang = (lang, data) => {
    return data.filter(quiz => quiz.lang === lang)
}

const getQuizeDataByName = (quizes, quizName) => {
    return quizes.filter(quiz => quiz.name === quizName)[0]
}

const createQuizLevels = (quizData) => {
    let levelData = new Map()
    quizData.data.forEach(element => {
        const criteria = element.criteria
        if(levelData.has(criteria)) {
            const elements = levelData.get(criteria)
            elements.push(element)
        } else {
            const elements = [element]
            levelData.set(criteria, elements)
        }
    });
    
    const target = []
    quizData.levels.forEach(levelName => {
        const levelInfo = {
            levelName: levelName,
            data: levelData.get(levelName)
        }
        target.push(levelInfo)
    })

    return target
}

const getRandomNumber = (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start;
}

const shuffleAnswers = (levelData) => {
    const answers = []
    levelData.forEach(item => answers.push(item))
    return answers
}


export default {
    removeAllChildren: removeAllChildren,
    createUnorderedList: createUnorderedList,
    createBtns: createBtns,
    createBtnWithContent: createBtnWithContent,
    createAudio: createAudio,
    createParagraph: createParagraph,
    createTextNode: createTextNode,
    createImage: createImage,
    createSpan: createSpan,
    wrapToDivs: wrapToDivs, 
    createRadioButtons: createRadioButtons,
    findElementByClass:findElementByClass,
    findAllElementsByClass: findAllElementsByClass,
    filterQuizDataByLang: filterQuizDataByLang,
    getQuizeDataByName: getQuizeDataByName, 
    createQuizLevels: createQuizLevels,
    getRandomNumber: getRandomNumber,
    shuffleAnswers: shuffleAnswers,
    createCustomAudioPlayerMarkup: createCustomAudioPlayerMarkup
}