import util from './util.js'
import vars from './quiz-vars.js'
import createAudioPlayer from "./audio-player.js"

let galleryData = null

let descMountPoint = null

let current = 0

const createQuizGalleryDesc = (item) => {
    const descImage = util.createImage('', [vars.DESC_PANEL_IMG])
    descImage.src = item.image

    const descNameTextNode = util.createTextNode(item.name)
    const descAbbrTextNode = util.createTextNode(item.species)


    const descName = util.createParagraph([descNameTextNode], [vars.DESC_PANEL_NAME])
    const descAbbr = util.createParagraph([descAbbrTextNode], [vars.DESC_PANEL_ABBR])
    const descPlayer = createAudioPlayer(item.audio, [vars.DESC_PANEL_PLAYER])
    
    const descNameContainer = util.wrapToDivs([vars.DESC_PANEL_NAME_CONTAINER], [descName])
    const descAbbrContainer = util.wrapToDivs([vars.DESC_PANEL_ABBR_CONTAINER], [descAbbr])
    const descPlayerContainer = util.wrapToDivs([vars.DESC_PANEL_PLAYER_CONTAINER], [descPlayer])
    
    const descTopLeft = util.wrapToDivs([vars.DESC_PANEL_LEFT_CONTAINER, vars.DESC_PANEL_IMG_CONTAINER], [descImage])
    const descTopRight = util.wrapToDivs([vars.DESC_PANEL_RIGHT_CONTAINER], [descNameContainer, descAbbrContainer, descPlayerContainer])

    const descPanelTop = util.wrapToDivs([vars.DESC_PANEL_TOP], [descTopLeft, descTopRight])

    const descTextNode = util.createTextNode(item.description)
    const descPanelDesc = util.createParagraph([descTextNode], [vars.DESC_PANEL_TEXT])
    const descPanelBottom = util.wrapToDivs([vars.DESC_PANEL_BOTTOM, vars.DESC_PANEL_TEXT_CONTAINER], [descPanelDesc])

    const descPanel = util.wrapToDivs([vars.DESC_PANEL_CONTAINER, vars.DESC_PANEL], [descPanelTop, descPanelBottom])

    return descPanel
} 

const nextClickButtonHandler = () => {
    current++
    if (current === galleryData.length) {
        current = 0
    }
    util.removeAllChildren(descMountPoint)
    descMountPoint.appendChild(createQuizGalleryDesc(galleryData[current]))
}

const prevClickButtonHandler = () => {
    current--
    if(current < 0) {
        current = galleryData.length - 1
    }
    util.removeAllChildren(descMountPoint)
    descMountPoint.appendChild(createQuizGalleryDesc(galleryData[current]))
}


const createGalleryMarkup = () => {
    const prev = util.createBtnWithContent(['gallery-panel-prev', 'btn'], ["Prev"])[0]
    const next = util.createBtnWithContent(['gallery-panel-next', 'btn'], ["Next"])[0]
    next.addEventListener("click", nextClickButtonHandler)
    prev.addEventListener("click", prevClickButtonHandler)

    const ul = util.createUnorderedList(["gallery-panel-control"], [prev, next], ["gallery-panel-btn-container"])

    const descPanel = createQuizGalleryDesc(galleryData[current])
    const descPanelContainer = util.wrapToDivs(["gallery-desc-container"], [descPanel])

    const gallery = util.wrapToDivs(["gallery-panel-container", "gallery-panel"], [descPanelContainer, ul])

    return gallery
}



const createGallery = (data) => {
    console.log(data)
    galleryData = data

    const gallery = createGalleryMarkup()

    descMountPoint = util.findElementByClass(gallery, "gallery-desc-container")

    return gallery
}

export default createGallery