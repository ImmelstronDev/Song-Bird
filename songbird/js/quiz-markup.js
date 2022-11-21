import createAudioPlayer from "./audio-player.js"
import util from "./util.js"
import vars from "./quiz-vars.js"


const createLevelPanel = (levelNames) => {
    const levelPanelElements = levelNames
        .map(item => util.createTextNode(item))
        .map(item => util.createParagraph([item], [vars.LEVEL_PANEL_ITEM]))
    const levelPanel = util.createUnorderedList([vars.LEVEL_PANEL], levelPanelElements, [vars.LEVEL_PANEL_ITEM_CONTAINER])
    return util.wrapToDivs([vars.LEVEL_PANEL_CONTAINER], [levelPanel])
}

const createAnswerPanel = (count) => {
    console.log(count)
    const btns = util.createBtns(count, [vars.ANSWER_BTN])
    btns.forEach((btn, index) => btn.dataset.order = index)
    const ul = util.createUnorderedList([vars.ANSWER_PANEL], btns)
    const correctSound = util.createAudio('../sounds/correct.mp3', [vars.ANSWER_PANEL_SOUND_CORRECT, vars.HIDDEN])
    const incorrectSound = util.createAudio('../sounds/incorrect.mp3', [vars.ANSWER_PANEL_SOUND_INCORRECT, vars.HIDDEN])
    console.log(correctSound)
    return  util.wrapToDivs([vars.ANSER_PANEL_CONTTAINER], [ul, correctSound, incorrectSound])
}

const createDescPlaceHolder = () => {
    const placeholders = ["Listen to audio player.", "Choose answer from list"]
    .map(item => util.createTextNode(item))
    .map(item => util.createParagraph([item], [vars.DESC_PLACEHOLDER_PANEL_ITEM]))
    return util.wrapToDivs([vars.DESC_PLACEHOLDER_PANEL_CONTAINER, vars.DESC_PLACEHOLDER_PANEL], placeholders)
}

const createQuestionPanel = (image, name, audio) => {
    const questionImg = util.createImage(image, [vars.QUESTION_PANEL_IMG])
    const questionPanelLeft = util.wrapToDivs([vars.QUESTION_PANEL_LEFT, vars.QUESTION_PANEL_IMG_CONTAINER], [questionImg])

    const questionNameText = util.createTextNode(name)
    const questionName = util.createParagraph([questionNameText], [vars.QUESTION_PANEL_NAME])
    const questionNameContainer = util.wrapToDivs([vars.QUESTION_PANEL_NAME_CONTAINER], [questionName])

    const questionAudio = createAudioPlayer(audio, [vars.QUESTION_PANEL_AUDIO])
    const questionAudioContainer = util.wrapToDivs([vars.QUESTION_PANEL_AUDIO_CONTAINER], [questionAudio])

    const questionPanelRight = util.wrapToDivs([vars.QUESTION_PANEL_RIGHT], [questionNameContainer, questionAudioContainer])

    const questionPanel = util.wrapToDivs([vars.QUESTION_PANEL], [questionPanelLeft, questionPanelRight])

    return questionPanel 
} 

const createDescPanel = (answer) => {
    const descImage = util.createImage('', [vars.DESC_PANEL_IMG])
    descImage.src = answer.image


    const descNameTextNode = util.createTextNode(answer.name)
    const descAbbrTextNode = util.createTextNode(answer.species)


    const descName = util.createParagraph([descNameTextNode], [vars.DESC_PANEL_NAME])
    const descAbbr = util.createParagraph([descAbbrTextNode], [vars.DESC_PANEL_ABBR])
    const descPlayer = createAudioPlayer(answer.audio, [vars.DESC_PANEL_PLAYER])
    
    const descNameContainer = util.wrapToDivs([vars.DESC_PANEL_NAME_CONTAINER], [descName])
    const descAbbrContainer = util.wrapToDivs([vars.DESC_PANEL_ABBR_CONTAINER], [descAbbr])
    const descPlayerContainer = util.wrapToDivs([vars.DESC_PANEL_PLAYER_CONTAINER], [descPlayer])
    
    const descTopLeft = util.wrapToDivs([vars.DESC_PANEL_LEFT_CONTAINER, vars.DESC_PANEL_IMG_CONTAINER], [descImage])
    const descTopRight = util.wrapToDivs([vars.DESC_PANEL_RIGHT_CONTAINER], [descNameContainer, descAbbrContainer, descPlayerContainer])

    const descPanelTop = util.wrapToDivs([vars.DESC_PANEL_TOP], [descTopLeft, descTopRight])

    const descTextNode = util.createTextNode(answer.description)
    const descPanelDesc = util.createParagraph([descTextNode], [vars.DESC_PANEL_TEXT])
    const descPanelBottom = util.wrapToDivs([vars.DESC_PANEL_BOTTOM, vars.DESC_PANEL_TEXT_CONTAINER], [descPanelDesc])

    const descPanel = util.wrapToDivs([vars.DESC_PANEL_CONTAINER, vars.DESC_PANEL], [descPanelTop, descPanelBottom])

    return descPanel
}

const createInfoPanel = () => {
    const logo = util.createImage('', [vars.INFO_PANEL_LOGO])
    
    
    const scoreDesc = util.createTextNode("Score: ")
    const scoreNumber = util.createSpan("0", [vars.INFO_PANEL_SCORE_NUMBER])
    const score = util.createParagraph([scoreDesc, scoreNumber], [vars.INFO_PANEL_SCORE])

    const infoPanelLeft = util.wrapToDivs([vars.INFO_PANEL_LEFT, vars.INFO_PANEL_LOGO_CONTAINER], [logo])
    const infoPanelRight = util.wrapToDivs([vars.INFO_PANEL_RIGHT, vars.INFO_PANEL_SCORE_CONTAINER], [score])
    
    const infoPanel = util.wrapToDivs([vars.INFO_PANEL_CONTAINER, vars.INFO_PANEL], [infoPanelLeft, infoPanelRight])
    return infoPanel
}

const createControlPanel = () => {
    const nextLevelBtn = util.createBtnWithContent([vars.CONTROL_PANEL_BTN], ["Next Level"])
    const controlPanel = util.wrapToDivs([vars.CONTROL_PANEL_CONTAINER, vars.CONTROL_PANEL], nextLevelBtn)
    return controlPanel
}

const createQuizeMarkup = (data) => {
    const levels = data.map(item => item.levelName)
    const answerCount = data[0].data.length
    
    const infoPanel = createInfoPanel()
    const levelPanel = createLevelPanel(levels)
    const questionPanel = util.wrapToDivs([vars.QUESTION_PANEL_CONTAINER], [])

    const answerPanel = createAnswerPanel(answerCount)
    const quizAnswerLeft = util.wrapToDivs([vars.QUIZ_ANSWER_LEFT], [answerPanel])
    const quizAnswerRight = util.wrapToDivs([vars.QUIZ_ANSWER_RIGHT], [])
    const quizAnswer = util.wrapToDivs([vars.QUIZ_ANSWER_CONTAINER], [quizAnswerLeft, quizAnswerRight])
    
    const controlPanel = createControlPanel()

    const quizMarkup = util.wrapToDivs([vars.QUIZ_CONTAINER, vars.QUIZ_CONTENT], [
        infoPanel, levelPanel, questionPanel, quizAnswer, controlPanel
    ])

    return quizMarkup
}

const createResultPanel = (maxScore, currentScore) => {
    const congTextNode = util.createTextNode("Congratulations!")
    const congr = util.createParagraph([congTextNode], [vars.RESULT_PANEL_CONGRATULATION])

    const scoreTextNode = util.createTextNode(`Your quiz score is ${currentScore} from ${maxScore}`)
    const score = util.createParagraph([scoreTextNode], [vars.RESULT_PANEL_SCORE])

    const repeatButton = util.createBtnWithContent([vars.RESULT_PANEL_REPEAT], ["Repeat again!"])[0]
    const repeat = util.wrapToDivs([vars.RESULT_PANEL_REPEAT_CONTAINER], [repeatButton])
    const resultPanel = util.wrapToDivs([vars.RESULT_PANEL_CONTAINER, vars.RESULT_PANEL], [congr, score, repeat])

    return resultPanel
}



export default {
    createQuizeMarkup: createQuizeMarkup,
    createQuestionPanel: createQuestionPanel,
    createDescPanel: createDescPanel,
    createDescPlaceHolder: createDescPlaceHolder,
    createResultPanel: createResultPanel
}