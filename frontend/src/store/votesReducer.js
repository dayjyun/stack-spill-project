import { csrfFetch } from "./csrf";

const GET_ALL_VOTES = 'votes/getAllVotes'
const GET_VOTE = 'votes/getVote'
const CREATE_VOTE = 'votes/createVote'
const EDIT_VOTE = 'votes/editVote'
const DELETE_VOTE = 'votes/deleteVote'

// get all votes
const getAll = (list) => {
    return {
        type: GET_ALL_VOTES,
        list
    }
}

export const getAllVotes = () => async (dispatch) => {
    const allVotes = await fetch('/api/votes')

    if (allVotes.ok) {
        const resAllVotes = await allVotes.json()
        dispatch(getAll(resAllVotes))
    }
}

// get vote
const getCurrentVote = (vote) => {
    return {
        type: GET_VOTE,
        vote
    }
}

export const getQuestionVote = (questionId) => async (dispatch) => {
    const questionVote = await fetch(`/api/questions/${questionId}/votes`)

    if (questionVote.ok) {
        const resQuestionVote = await questionVote.json()
        dispatch(getCurrentVote(resQuestionVote))
    }
}

export const getAnswerVote = (answerId) => async (dispatch) => {
    const answerVote = await fetch(`/api/answer/${answerId}/votes`)

    if (answerVote.ok) {
        const resAnswerVote = answerVote.json()
        dispatch(getCurrentVote(resAnswerVote))
    }
}

// create vote
const addVote = (vote) => {
    return {
        type: CREATE_VOTE,
        vote
    }
}

export const createQuestionVote = (voteData) => async (dispatch) => {
    const { vote, questionId } = voteData

    const newVote = await csrfFetch(`/api/questions/${questionId}/votes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({vote})
    })

    if (newVote.ok) {
        const resNewVote = await newVote.json()
        dispatch(addVote(resNewVote))
        return resNewVote
    }
}

export const createAnswerVote = (voteData) => async (dispatch) => {
    const { vote, answerId } = voteData

    const newVote = await csrfFetch(`/api/answers/${answerId}/votes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            vote
        })
    })
    if(newVote.ok) {
        const resNewVote = await newVote.json()
        dispatch(addVote(resNewVote))
        return resNewVote
    }
}

// edit vote
const updateVote = (vote) => {
    return {
        type: EDIT_VOTE,
        vote
    }
}

export const editQuestionVote = (question) => async (dispatch) => {
    const updatedVote = await csrfFetch(`/api/questions/${question.questionId}/votes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
    if (updatedVote.ok) {
        const resVote = await updatedVote.json()
        dispatch(updateVote(resVote))
    }
}


export const editAnswerVote = (answer) => async (dispatch) => {
    const updatedVote = await csrfFetch(`/api/answers/${answer.answerId}/votes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answer)
    })
    if (updatedVote.ok) {
        const resVote = await updatedVote.json()
        dispatch(updateVote(resVote))
    }
}

// delete vote
const removeVote = (id) => {
    return {
        type: DELETE_VOTE,
        id
    }
}

export const deleteQuestionVote = (questionId) => async (dispatch) => {
    const questionVote = await csrfFetch(`/api/questions/${questionId}/votes`, {
        method: "DELETE",
    })
    if (questionVote.ok) {
      dispatch(removeVote(questionId));
    }
}

export const deleteAnswerVote = (answerId) => async (dispatch) => {
    const answerVote = await csrfFetch(`/api/answers/${answerId}/votes`, {
        method: "DELETE"
    })
    if (answerVote.ok) {
      dispatch(removeVote(answerId));
    }
}

let initialState = {}

export default function voteReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_VOTES:
        initialState = { ...state };
        action.list.forEach((vote) => {
          initialState[vote.id] = vote;
        });
        return initialState;

      case GET_VOTE:
        return { ...state, [action.vote.id]: action.vote };

      case EDIT_VOTE:
        return { ...state, [action.vote.id]: action.vote };

      case DELETE_VOTE:
        const removeVoteState = { ...state };
        delete removeVoteState[action.id];
        return removeVoteState;

      default:
        return state;
    }
}
