import { csrfFetch } from "./csrf";

const GET_ALL_QUESTIONS = 'questions/getAllQuestions'
const GET_QUESTION = 'questions/getQuestion'
const CREATE_QUESTION = 'questions/createQuestion'
const EDIT_QUESTION = 'questions/editQuestion'
const DELETE_QUESTION = 'questions/deleteQuestion'

// get all questions
const getAll = (list) => {
    return {
        type: GET_ALL_QUESTIONS,
        list,
    }
}

export const getAllQuestions = () => async (dispatch) => {
    const allQuestions = await fetch('/api/questions')

    if (allQuestions.ok) {
        const resAllQuestions = await allQuestions.json()
        dispatch(getAll(resAllQuestions));
    }
}

// get question
const getCurrentQuestion = (question) => {
    return {
        type: GET_QUESTION,
        question
    }
}

export const getQuestion = (questionId) => async (dispatch) => {
    const specificQuestion = await fetch(`/api/questions/${questionId}`)

    if (specificQuestion.ok) {
      const resSpecificQuestion = await specificQuestion.json();
      dispatch(getCurrentQuestion(resSpecificQuestion));
    }
}

// create question
const addQuestion = (question) => {
    return {
        type: CREATE_QUESTION,
        question
    }
}

export const createQuestion = (questionData) => async (dispatch) => {
    const { title, body } = questionData;
    const formData = new FormData();

    formData.append('title', title)
    formData.append('body', body)

    const newQuestion = await csrfFetch(`/api/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: formData
    })
    if (newQuestion.ok) {
        const resNewQuestion = await newQuestion.json()
        dispatch(addQuestion(resNewQuestion))
        return resNewQuestion
    }
}

// edit question
const updateQuestion = (question) => {
    return {
        type: EDIT_QUESTION,
        question
    }
}

export const editQuestion = (question) => async (dispatch) => {
    const questionEdit = await csrfFetch(`/api/questions/${question.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
    if (questionEdit.ok) {
      const resQuestionEdit = await questionEdit.json();
      dispatch(updateQuestion(resQuestionEdit));
    }
}

// delete question
const removeQuestion = (id) => {
    return {
        type: DELETE_QUESTION,
        id
    }
}

export const deleteQuestion = (questionId) => async (dispatch) => {
    const questionDelete = await csrfFetch(`/api/questions/${questionId}`, {
        method: "DELETE",
    })
    if (questionDelete.ok) {
      dispatch(removeQuestion(questionId));
    }
}

let initialState = {}

export default function questionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            initialState = { ...state }
            action.list.forEach(question => {
                initialState[question.id] = question
            })
            return initialState

        case GET_QUESTION:
            return { ...state, [action.question.id]: action.question }

        case EDIT_QUESTION:
            return { ...state, [action.question.id]: action.question }

        case DELETE_QUESTION:
            const removeQuestionState = { ...state }
            delete removeQuestionState[action.id]
            return removeQuestionState

        default:
            return state
    }
}
