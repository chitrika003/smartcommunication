import "./404.css"

export const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/">Go to Homepage</a>
    </div>
  )
}
