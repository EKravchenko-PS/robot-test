'use client'

import { useState, useEffect } from 'react'

interface PlacementViewProps {
  options: {
    properties: {
      [key: string]: {
        NAME: string
        MULTIPLE?: string
        DEFAULT?: string[]
      }
    }
    current_values: {
      [key: string]: string | string[]
    }
  }
}

export default function PlacementView({ options }: PlacementViewProps) {
  const [formData, setFormData] = useState<{[key: string]: string | string[]}>({})

  useEffect(() => {
    if (options.current_values) {
      setFormData(options.current_values)
    }
  }, [options.current_values])

  const handleInputChange = (id: string, value: string, multiple: boolean) => {
    setFormData(prevData => {
      let newValue: string | string[]
      if (multiple) {
        newValue = Array.isArray(prevData[id]) ? [...(prevData[id] as string[]), value] : [value]
      } else {
        newValue = value
      }
      
      window.BX24.placement.call(
        'setPropertyValue',
        { [id]: newValue }
      )

      return { ...prevData, [id]: newValue }
    })
  }

  return (
    <form className="space-y-4">
      {Object.entries(options.properties).map(([id, property]) => {
        const multiple = property.MULTIPLE === 'Y'
        const values = (formData[id] || property.DEFAULT || ['']) as string[]

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

