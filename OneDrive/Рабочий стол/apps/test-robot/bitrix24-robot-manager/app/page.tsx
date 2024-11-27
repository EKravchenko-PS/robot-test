'use client'

import { useEffect, useState } from 'react'
import DefaultView from './components/DefaultView'
import PlacementView from './components/PlacementView'

declare global {
  interface Window {
    BX24: any;
  }
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [placement, setPlacement] = useState<string | null>(null)
  const [placementOptions, setPlacementOptions] = useState<any>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//api.bitrix24.com/api/v1/'
    script.async = true
    script.onload = () => {
      window.BX24.init(() => {
        setIsLoaded(true)
        const placementInfo = window.BX24.placement.info()
        setPlacement(placementInfo.placement)
        setPlacementOptions(placementInfo.options)
      })
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Робот-встройка</h1>
      {placement === 'DEFAULT' ? (
        <DefaultView />
      ) : (
        <PlacementView options={placementOptions} />
      )}
    </div>
  )
}

