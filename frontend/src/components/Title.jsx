import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-[#6B4E2E]">
        {text1}{' '}
        <span className="text-[#4A2F1A] font-medium">
          {text2}
        </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#4A2F1A]"></p>
    </div>
  )
}

export default Title
