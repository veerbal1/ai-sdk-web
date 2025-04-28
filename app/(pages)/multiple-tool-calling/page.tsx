"use client"

import { Button } from '@/shared/components/ui/button'
import React from 'react'

const MultipleToolCalling = () => {

    const handleSubmit = async () => {
        const response = await fetch('/api/multiple-tool-calling', {
            method: 'POST',
            body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello, how are you?' }] }),
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className='w-full gap-3 h-full flex justify-center items-center flex-col'  >
            <div className='w-full flex justify-center items-center'>
                Completion:
            </div>
            <Button onClick={handleSubmit}>Click me</Button>
        </div>
    )
}

export default MultipleToolCalling