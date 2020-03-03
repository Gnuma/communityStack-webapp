import React, { useState } from 'react'

const useInputChange = () : [{}, (e: React.ChangeEvent<HTMLInputElement>) => void]  => {
  const [input, setInput] = useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return [input, handleInputChange]
}

export default useInputChange;