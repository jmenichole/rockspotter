import { useState } from 'react'

const SmartImage = ({ src, alt = '', className = '', fallbackClassName = 'flex items-center justify-center bg-gray-100 text-gray-500', style }) => {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div className={`${fallbackClassName} ${className}`} style={style}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm2.5 6.5l2.5 3 3.5-4.5 3 4.5H5.5z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  )
}

export default SmartImage
