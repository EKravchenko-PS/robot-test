'use client'

import { useState, useEffect } from 'react'

interface RobotFormProps {
  options: {
    properties: {
      [key: string]: {
        NAME: string
        MULTIPLE?: string
      }
    }
    current_values: {
      [key: string]: string | string[]
    }
  }
}

export default function RobotForm({ options }: RobotFormProps) {
  const [formData, setFormData] = useState<{[key: string]: string | string[]}>({})

  useEffect(() => {
    if (options.current_values) {
      setFormData(options.current_values)
    }
  }, [options.current_values])

  const handleInputChange = (name: string, value: string, multiple: boolean) => {
    setFormData(prevData => {
      if (multiple) {
        const newValue = Array.isArray(prevData[name]) ? [...prevData[name] as string[], value] : [value]
        return { ...prevData, [name]: newValue }
      } else {
        return { ...prevData, [name]: value }
      }
    })

    // Здесь бы вызывался метод BX24.placement.call('setPropertyValue', ...)
    console.log(`Setting property ${name} to`, value)
  }

  return (
    <form className="space-y-4">
      {Object.entries(options.properties).map(([id, property]) => {
        const multiple = property.MULTIPLE === 'Y'
        const values = (formData[id] || ['']) as string[]

        return (
          <div key={id} className="form-group">
            <label className="block text-sm font-medium text-gray-700">{property.NAME}:</label>
            {values.map((value, index) => (
              <input
                key={`${id}-${index}`}
                name={multiple ? `${id}[]` : id}
                value={value}
                onChange={(e) => handleInputChange(id, e.target.value, multiple)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ))}
            {multiple && (
              <button
                type="button"
                onClick={() => handleInputChange(id, '', true)}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Добавить
              </button>
            )}
          </div>
        )
      })}
    </form>
  )
}

