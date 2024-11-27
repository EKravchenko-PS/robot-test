'use client'

import { useState } from 'react'

export default function DefaultView() {
  const [message, setMessage] = useState<string | null>(null)

  const installRobot = () => {
    const params = {
      'CODE': 'robot',
      'HANDLER': window.location.origin + window.location.pathname,
      'AUTH_USER_ID': 1,
      'NAME': 'Пример робота-встройки',
      'USE_PLACEMENT': 'Y',
      'PLACEMENT_HANDLER': window.location.origin + window.location.pathname,
      'PROPERTIES': {
        'string': {
          'Name': 'Параметр 1',
          'Type': 'string'
        },
        'stringm': {
          'Name': 'Параметр 2',
          'Type': 'string',
          'Multiple': 'Y',
          'Default': ['value 1', 'value 2']
        },
      }
    }

    window.BX24.callMethod(
      'bizproc.robot.add',
      params,
      (result: any) => {
        if (result.error())
          setMessage("Ошибка: " + result.error())
        else
          setMessage("Успешно установлен")
      }
    )
  }

  const uninstallRobot = () => {
    window.BX24.callMethod(
      'bizproc.robot.delete',
      { 'CODE': 'robot' },
      (result: any) => {
        if (result.error())
          setMessage('Ошибка: ' + result.error())
        else
          setMessage("Успешно удален")
      }
    )
  }

  const getList = () => {
    window.BX24.callMethod(
      'bizproc.robot.list',
      {},
      (result: any) => {
        if (result.error())
          setMessage("Ошибка: " + result.error())
        else
          setMessage("Коды установленных роботов: " + result.data().join(', '))
      }
    )
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

