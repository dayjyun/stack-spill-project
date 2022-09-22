import { csrfFetch } from "./csrf";

const GET_ALL_ANSWERS = 'answers/getAllAnswers'
const GET_ANSWER = 'answers/getAnswer'
const CREATE_ANSWER = 'answers/createAnswer'
const EDIT_ANSWER = 'answers/editAnswer'
const DELETE_ANSWER = 'answers/deleteAnswer'

// get all answers
const getAll = (list) => {
    return {
        type: GET_ALL_ANSWERS,
        list
    }
}

export const getAllAnswers = () => async (dispatch) => {
    const allAnswers = await fetch(`/api/answers`)

    if (allAnswers.ok) {
        const resAllAnswers = await allAnswers.json()
        dispatch(getAll(resAllAnswers))
    }
}

// get answer
const getCurrentAnswer = (answer) => {
    return {
        type: GET_ANSWER,
        answer
    }
}

export const getAnswer = (answerId) => async (dispatch) => {
    const answer = await fetch(`/api/answers/${answerId}`)

    if (answer.ok) {
        const resAnswer = answer.json()
        dispatch(getCurrentAnswer(resAnswer))
    }
}

// create answer
const addAnswer = (answer) => {
    return {
        type: CREATE_ANSWER,
        answer
    }
}

export const createAnswer = (answerData) => async (dispatch) => {
    const { body, questionId } = answerData
    const formData = new FormData()

    formData.append('body', body)

    const newAnswer = await csrfFetch(`/api/questions/${questionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formData
    })
    if (newAnswer.ok) {
        const resNewAnswer = await newAnswer.json()
        dispatch(addAnswer(resNewAnswer))
        return resNewAnswer
    }
}

// edit answer
const updateAnswer = (answerId) => {
    return {
        type: EDIT_ANSWER,
        answerId
    }
}

export const editAnswer = (answer) => async (dispatch) => {
    const updateAnswer = await csrfFetch(`/api/answers/${answer.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answer)
    })
    if(updateAnswer.ok) {
        const resAnswer = await updateAnswer.json()
        dispatch(updateAnswer(resAnswer))
    }
}

// delete answer
const removeAnswer = (id) => {
    return {
        type: DELETE_ANSWER,
        id
    }
}

export const deleteQuestion = (answerId) => async (dispatch) => {
    const answer = await csrfFetch(`/api/answers/${answerId}`, {
        method: "DELETE",
    })
    if(answer.ok) {
        dispatch(removeAnswer(answerId))
    }
}

let initialState = {}

export default function answerReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_ANSWERS:
            initialState = { ...state }
            action.list.forEach(answer => {
                initialState[answer.id] = answer
            })
            return initialState

        case GET_ANSWER:
            return { ...state, [action.answer.id]: action.answer }

        case EDIT_ANSWER:
            return { ...state, [action.answer.id]: action.answer }

        case DELETE_ANSWER:
            const removeAnswerState = { ...state }
            delete removeAnswerState[action.id]
            return removeAnswerState

        default:
            return state
    }
}
