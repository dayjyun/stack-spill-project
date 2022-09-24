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
    const specificAnswer = await fetch(`/api/answers/${answerId}`)

    if (specificAnswer.ok) {
      const resSpecificAnswer = await specificAnswer.json();
      dispatch(getCurrentAnswer(resSpecificAnswer));
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
const updateAnswer = (answer) => {
    return {
        type: EDIT_ANSWER,
        answer
    }
}

export const editAnswer = (answerData) => async (dispatch) => {
    const answerEdit = await csrfFetch(`/api/answers/${answerData?.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answerData)
    })
    if (answerEdit.ok) {
      const resAnswerEdit = await answerEdit.json();
      dispatch(updateAnswer(resAnswerEdit));
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
    const answerDelete = await csrfFetch(`/api/answers/${answerId}`, {
        method: "DELETE",
    })
    if (answerDelete.ok) {
      dispatch(removeAnswer(answerId));
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
