import markup from './quiz-markup.js'
import vars from './quiz-vars.js'
import util from './util.js';

const MAX_SCORE = 5;

const CLASS_CORRECT_ANSWER = 'true-answer';
const CLASS_INCORRECT_ANSWER = 'false-answer';

const QUESTION_IMAGE_PLACEHOLDER = "img/bird-placeholder.jpg"
const QUESTION_NAME_PLACEHOLDER = "******"

const CURRENT_LEVEL_ITEM_HIGHLIGHT = 'current-level-item-highlight'

let callback = null
let quizMarkup = null
let quizLogo = null
let levelPanelItemsContainer = null
let levelPanelItems = null
let questionPanelMountPoint = null
let descMountPoint = null
let answerBtns = null
let nextLevelBtn = null
let soundCorrect = null
let soundIncorrect = null


let scoreNumber = null
let quizData = null
let levelData = null
let lvl = 0;
let questionIndex = null
let answers = null
let choosenOptions = new Set() 
let hasCorrectAnswer = false
let totalScore = 0;



const calculateScore = () => {
    totalScore += MAX_SCORE - (choosenOptions.size - 1)
} 

const toggleNextLevelBtn = () => {
    nextLevelBtn.disabled = !nextLevelBtn.disabled
    
}

const isCorrectAnswer = (answer) => {
    return answer === levelData[lvl].data[questionIndex]
}

const showResultPanel = () => {
    const container = util.findElementByClass(quizMarkup, vars.QUIZ_CONTENT)
    container.removeChild(questionPanelMountPoint)
    container.removeChild(util.findElementByClass(container, vars.QUIZ_ANSWER_CONTAINER))
    container.removeChild(util.findElementByClass(container, vars.CONTROL_PANEL_CONTAINER))

    const resultPanel = markup.createResultPanel(levelData.length * MAX_SCORE, totalScore)
    const repeatBtn = util.findElementByClass(resultPanel, vars.RESULT_PANEL_REPEAT)

    repeatBtn.addEventListener('click', () => callback())
    
    container.appendChild(resultPanel)
}


const handleCorrectAnswer = (answer) => {
    calculateScore(choosenOptions.size)
    if(lvl === levelData.length - 1) {
        showResultPanel()
    }


    hasCorrectAnswer = true

    toggleNextLevelBtn()
    renderScore()
    fillQuestionPanel(answer.image, answer.name, answer.audio)
}

const markButton = (isCorrect, target) => {
    if(isCorrect) {
        target.classList.add(CLASS_CORRECT_ANSWER)
    } else {
        target.classList.add(CLASS_INCORRECT_ANSWER)
    }
}

const playAudio = (audioElement) => {
    audioElement.pause()
    audioElement.currentTime = 0
    audioElement.play()
}

const playAnswerAccompaniment = (isCorrect) => {
    if(isCorrect){
        playAudio(soundCorrect)
    } else {
        playAudio(soundIncorrect)
    }
}

const clickAnswerBtnHandler = (evt) => {
    const order = evt.target.dataset.order
    choosenOptions.add(order)
    const answer = answers[order]
    let isCorrect = isCorrectAnswer(answer)
    
    if (!hasCorrectAnswer) {
        playAnswerAccompaniment(isCorrect)
        markButton(isCorrect, evt.target)
        if(isCorrect){
            handleCorrectAnswer(answer)
        }
    }
    
    
    fillDescPanel(answer)
    
}




const prepareAnswerBtns = (btns) => {
    btns.forEach(btn => btn.addEventListener('click', clickAnswerBtnHandler))
}

const clickNextLevelHandler = () => {
    lvl++
    hasCorrectAnswer = false
    choosenOptions.clear()
    toggleNextLevelBtn()

    prepareLevelData()
    highlightLevelPanelItem()
    fillAnswersPanel()
    fillDescPanelOnStartUp()
    fillStartupQuestionPanel()
}

const preparationMarkup = (markup) => {
    quizLogo = util.findElementByClass(markup, vars.INFO_PANEL_LOGO)
    scoreNumber = util.findElementByClass(markup, vars.INFO_PANEL_SCORE_NUMBER)
    levelPanelItemsContainer = util.findAllElementsByClass(markup, vars.LEVEL_PANEL_ITEM_CONTAINER)
    levelPanelItems = util.findAllElementsByClass(markup, vars.LEVEL_PANEL_ITEM)
    questionPanelMountPoint = util.findElementByClass(markup, vars.QUESTION_PANEL_CONTAINER)
    descMountPoint = util.findElementByClass(markup, vars.QUIZ_ANSWER_RIGHT)
    answerBtns = util.findAllElementsByClass(markup, vars.ANSWER_BTN)
    nextLevelBtn = util.findElementByClass(markup, vars.CONTROL_PANEL_BTN)
    soundCorrect = util.findElementByClass(markup, vars.ANSWER_PANEL_SOUND_CORRECT)
    soundIncorrect = util.findElementByClass(markup, vars.ANSWER_PANEL_SOUND_INCORRECT)

    prepareAnswerBtns(answerBtns)
    nextLevelBtn.addEventListener("click", clickNextLevelHandler)
}

const prepareLevelData = () => {

    levelData = quizData.levelData
    console.log(quizData)
    questionIndex = util.getRandomNumber(0, levelData[lvl].data.length)
    answers = util.shuffleAnswers(levelData[lvl].data)
}

const renderScore = () => {
    scoreNumber.textContent = totalScore
}

const fillInfoPanel = () => {
    quizLogo.src = quizData.logo
    renderScore()
} 

const highlightLevelPanelItem = () => {
    levelPanelItemsContainer[lvl].classList.add(CURRENT_LEVEL_ITEM_HIGHLIGHT)
    if (lvl > 0) {
        levelPanelItemsContainer[lvl - 1].classList.remove(CURRENT_LEVEL_ITEM_HIGHLIGHT)
    }
}

const fillLevelPanelItems = () => {
    const levelNames = levelData.map(item => item.levelName)
    levelPanelItems.forEach((item, index) => item.textContent = levelNames[index])
    highlightLevelPanelItem()
}

const fillQuestionPanel = (image, questionName, audio) => {
    const questionPanel = markup.createQuestionPanel(image, questionName, audio)
    util.removeAllChildren(questionPanelMountPoint)
    questionPanelMountPoint.appendChild(questionPanel)
}

const fillStartupQuestionPanel = ()=> {
    fillQuestionPanel(QUESTION_IMAGE_PLACEHOLDER, QUESTION_NAME_PLACEHOLDER, levelData[lvl].data[questionIndex].audio)
}

const fillAnswersPanel = () => {
    answerBtns.forEach((btn, index) =>{
        btn.textContent = answers[index].name
        btn.classList.remove(CLASS_CORRECT_ANSWER)
        btn.classList.remove(CLASS_INCORRECT_ANSWER)
    } )
}

const fillDescPanel = (answer) => {
    util.removeAllChildren(descMountPoint)
    const descriptionPanel = markup.createDescPanel(answer)
    descMountPoint.appendChild(descriptionPanel)
}

const fillDescPanelOnStartUp = () => {
    util.removeAllChildren(descMountPoint)
    const descPlacehodler = markup.createDescPlaceHolder()
    descMountPoint.appendChild(descPlacehodler)
}

const buildQuizWithData = () => {
    prepareLevelData()
    fillInfoPanel()
    fillStartupQuestionPanel()
    fillLevelPanelItems()
    fillAnswersPanel()
    fillDescPanelOnStartUp()
    toggleNextLevelBtn()
}

const restartVars = () => {
    scoreNumber = null
    lvl = 0;
    questionIndex = null
    answers = null
    choosenOptions = new Set() 
    hasCorrectAnswer = false
    totalScore = 0;
}

const createQuize = (data, cb) => {
    quizData = data
    callback = cb
    restartVars()

    quizMarkup = markup.createQuizeMarkup(data.levelData)

    console.log(quizData)
    
    preparationMarkup(quizMarkup)
    buildQuizWithData()

    return quizMarkup
}



export default createQuize