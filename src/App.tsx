import clerkLogo from '/clerk-logo-dark.png'
import './App.css'
import { useUser, useClerk, ClerkProvider, SignedIn, SignedOut, SignIn, SignUp} from '@clerk/chrome-extension'
import { useNavigate, Routes, Route, MemoryRouter} from 'react-router-dom'

const HelloUser = () => {
  const { isSignedIn, user} = useUser() 
  const clerk = useClerk()

  if (!isSignedIn) {
    return null
  }

  return (
  <>
  <p>Hi, {user?.primaryEmailAddress?.emailAddress}</p>
      <p>
<button onClick={() => clerk.signOut()}>
  Sign Out
</button>
      </p>
  </>
  )
}


const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if ( !pubKey ) {
  throw new Error('You must add your Clerk Publishable Key to your .env file.')
}

const ClerkProviderWithRoutes = () => {
  const naviage = useNavigate()

  return (
    <ClerkProvider publishableKey={pubKey} navigate={(to) => naviage(to)}>
      <div>
        <header>
          <h1>Clerk Chrome Extension Starter</h1>
          <img src={clerkLogo} className="logo" alt="Vite logo" />
        </header>

        <main>
          <Routes>
            <Route path="/sign-up/*" element={<SignUp signInUrl='/' />} />
            <Route path="/" element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl='/sign-up' />
                </SignedOut>
                </>
            } />
          </Routes> 
        </main>
      </div>

    </ClerkProvider>
  )
}


const App = () => {
  return (
    <MemoryRouter>
<ClerkProviderWithRoutes />
    </MemoryRouter>
  )
}

export default App
