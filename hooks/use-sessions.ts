"use client"

import { useState, useEffect, useCallback } from "react"
import {
  loadSessions,
  addSession as addSessionToStorage,
  todayFocusMinutes as computeTodayFocusMinutes,
  focusSessionsCompletedToday,
  type Session,
} from "@/lib/sessions"

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    setSessions(loadSessions())
  }, [])

  const addSession = useCallback((session: Omit<Session, "id">) => {
    setSessions((prev) => addSessionToStorage(prev, session))
  }, [])

  const todayFocusMinutes = computeTodayFocusMinutes(sessions)
  const focusCompletedToday = focusSessionsCompletedToday(sessions)

  return {
    sessions,
    addSession,
    todayFocusMinutes,
    focusSessionsCompletedToday: focusCompletedToday,
  }
}
