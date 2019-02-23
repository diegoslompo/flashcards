import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo'

const defaultColors = {
  black: '#000',
  white: '#fff',
  gray: '#ccc',
  grayDark: '#666',
  grayLight: '#eee',
  blue: '#007bff',
  blueDark: '#1c69bb',
  green: '#28a745',
  greenDark: '#27803b',
  red: '#dc3545',
  redDark: '#a52834',
}
export const colors = {
  ...defaultColors,
  state: {
    primary: defaultColors.red,
    primaryActive: defaultColors.blueDark,
    danger: defaultColors.red,
    dangerActive: defaultColors.redDark,
    success: defaultColors.red,
    successActive: defaultColors.greenDark,
  },
};

const NOTIFICATION_KEY = 'flashcards:notifications'

export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to log your data today!"
  }
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}