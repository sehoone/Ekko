import API from '../../../api/question.js'

const state = {
  questionList: [],
  isLastQuestionList: false,
  page: 0
}
const getters = {
  questionList (state) {
    return state.questionList
  },
  isLastQuestionList (state) {
    return state.isLastQuestionList
  }
}
const mutations = {
  setQuestionList (state, questionList) {
    state.questionList.push(...questionList)
  },
  setPage (state, page) {
    state.page = page
  },
  setIsLastQuestionList (state, questionList) {
    console.log('setIsLastQuestionList ' + questionList)
    if (questionList.length) {
      console.log('questionList.length ' + state.isLastQuestionList)
      state.isLastQuestionList = false
    } else {
      console.log('isLastQuestionList ' + state.isLastQuestionList)
      state.isLastQuestionList = true
    }
  },
  addCommentToQuestion (state, data) {
    const question = state.questionList.find(question => question.id === data.questionId)
    if (!question.comments) {
      question.comments = []
    }
    question.comments.push(data.comment)
  },
  removeCommentFromQuestion (state, data) {
    const question = state.questionList.find(question => question.id === data.questionId)
    question.comments = question.comments.filter(comment => comment.id !== data.commentId)
  },
  addCommentToAnswer (state, data) {
    const question = state.questionList.find(question => question.id === data.questionId)
    const answer = question.answers.find(answer => answer.id === data.answerId)
    if (!answer.comments) {
      answer.comments = []
    }
    answer.comments.push(data.comment)
  },
  removeCommentFromAnswer (state, data) {
    const question = state.questionList.find(question => question.id === data.questionId)
    const answer = question.answers.find(answer => answer.id === data.answerId)
    answer.comments = answer.comments.filter(comment => comment.id !== data.commentId)
  }
}
const actions = {
  async search ({ commit, state }, requestData = {}) {
    const questionList = await API.search(requestData)
    commit('setQuestionList', questionList)
    commit('setPage', requestData.page)
    commit('setIsLastQuestionList', questionList)
  },
  async regiserCommentToQuestion ({ commit }, requestData) {
    const comment = await API.regiserCommentToQuestion(requestData)
    const data = {
      comment,
      questionId: requestData.questionId
    }
    commit('addCommentToQuestion', data)
  },
  async removeCommentFromQuestion ({ commit }, requestData) {
    await API.removeCommentFromQuestion(requestData)
    const data = {
      commentId: requestData.commentId,
      questionId: requestData.questionId
    }
    commit('removeCommentFromQuestion', data)
  },
  async regiserCommentToAnswer ({ commit }, requestData) {
    const comment = await API.regiserCommentToAnswer(requestData)
    const data = {
      comment,
      questionId: requestData.questionId,
      answerId: requestData.answerId
    }
    commit('addCommentToAnswer', data)
  },
  async removeCommentFromAnswer ({ commit }, requestData) {
    await API.removeCommentFromAnswer(requestData)
    const data = {
      commentId: requestData.commentId,
      questionId: requestData.questionId,
      answerId: requestData.answerId
    }
    commit('removeCommentFromAnswer', data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
