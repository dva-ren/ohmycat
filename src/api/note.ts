import http from '~/composables/requests'
import type { Note, PageInfo, Response } from '~/types'

type NoteListResult = Response<PageInfo<Note>>

export const queryNoteList = (pageNum = 1, pageSize = 20): NoteListResult => {
  return http.request({
    url: `/note?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
export const queryNote = (id: string): Response<Note> => {
  return http.request({
    url: `/note/${id}`,
    method: 'GET',
  })
}
