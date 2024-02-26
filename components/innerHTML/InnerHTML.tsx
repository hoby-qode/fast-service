import React from 'react'

const InnerHTML = ({ html }: { html: any }) => {
  return <div dangerouslySetInnerHTML={html} />
}

export default InnerHTML
