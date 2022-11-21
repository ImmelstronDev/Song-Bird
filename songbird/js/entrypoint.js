import quizes from "./quiz-data.js";
import createQuizePicker from "./quize-picker.js"
import createQuize from './quiz.js'
import util from "./util.js"
import createGallery from './gallery.js'


const APP_POINT = "app"
const appPoint = document.getElementById(APP_POINT)

const loadLanguage = () => {
    let lang = localStorage.getItem("lang")
    if (!lang) {
        lang = "ru"
    }

    return lang
}

const startQuiz = (quizeName, appPoint) => {
    util.removeAllChildren(appPoint)
    let quizeData = util.filterQuizDataByLang(loadLanguage(), quizes)
    const data = util.getQuizeDataByName(quizeData, quizeName)
    const quizLevels = util.createQuizLevels(data)
    const quiz = createQuize({
        logo: data.logo,
        levelData: quizLevels,
    }, initMainPage)
    appPoint.appendChild(quiz)
}

const startGallery = (quizName, appPoint) => {
    util.removeAllChildren(appPoint)
    let quizeData = util.filterQuizDataByLang(loadLanguage(), quizes)
    const data = util.getQuizeDataByName(quizeData, quizName)
    const gallery = createGallery(data.data)
    appPoint.appendChild(gallery)
}

const pickerHandler = (option) => {
    if(option.type === 'quiz') {
        startQuiz(option.name, appPoint)
    } else {
        startGallery(option.name, appPoint)
    }
}

const changeLangaugeHandler = () => {
    initMainPage()
}

const initMainPage = () => {
    util.removeAllChildren(appPoint)
    
    const lang = loadLanguage()
    let quizeData = util.filterQuizDataByLang(lang, quizes)
    let quizeNames = quizeData.map(quiz => quiz.name)
    const quizePicker = createQuizePicker(quizeNames, pickerHandler, changeLangaugeHandler)
    appPoint.appendChild(quizePicker)
}


initMainPage()


