'use client'

import { useState } from 'react'

export default function RobotManager() {
  const [message, setMessage] = useState<string | null>(null)

  const installRobot = async () => {
    try {
      const response = await fetch('/api/robot/install', { method: 'POST' })
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Ошибка при установке робота')
    }
  }

  const uninstallRobot = async () => {
    try {
      const response = await fetch('/api/robot/uninstall', { method: 'POST' })
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      setMessage('Ошибка при удалении робота')
    }
  }

  const getList = async () => {
    try {
      const response = await fetch('/api/robot/list')
      const data = await response.json()
      setMessage(`Коды установленных роботов: ${data.robots.join(', ')}`)
    } catch (error) {
      setMessage('Ошибка при получении списка роботов')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Робот</h2>
      <div className="space-x-2 mb-4">
        <button onClick={installRobot} className="bg-blue-500 text-white px-4 py-2 rounded">
          Установить
        </button>
        <button onClick={uninstallRobot} className="bg-red-500 text-white px-4 py-2 rounded">
          Удалить
        </button>
      </div>
      <button onClick={getList} className="bg-gray-200 px-4 py-2 rounded">
        Получить список установленных роботов
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}

