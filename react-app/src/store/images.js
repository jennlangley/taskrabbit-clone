const GET_IMAGES = "images/GET_IMAGES"
const CREATE_IMAGE = "images/CREATE_IMAGE"
const EDIT_IMAGE = "images/EDIT_IMAGE"

const getAllImagesAction = (images) => ({
    type: GET_IMAGES,
    payload: images
})

const createNewImageAction = (image) => ({
    type: CREATE_IMAGE,
    payload: image
})

const editThisImage = (editImage) => ({
    type: EDIT_IMAGE,
    payload: editImage
})

export const getAllImages = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllImagesAction(data));
    }
}

export const createNewImage = (imageUrl) => async (dispatch) => {

    const response = await fetch("/api/images", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imageUrl
        })
    })

    if (response.ok) {
		const data = await response.json();
		dispatch(createNewImageAction(data));
        return data
    }
}

export const editImage = ({content}, imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editThisImage(data))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_IMAGES:
            action.payload.images.forEach(image => newState[image.id] = image);
            return newState;
        case CREATE_IMAGE:
            newState[action.payload.image.id] = action.payload.image;
            return newState;
        case EDIT_IMAGE:
            newState[action.payload.editImage.id] = action.payload.editImage;
            return newState;
        default:
            return newState;
    }
}
