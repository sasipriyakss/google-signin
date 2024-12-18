import { useEffect, useState } from 'react'
// import { decode as jwt_decode } from 'jwt-decode';
import jwt_decode from "jwt-decode";       /*npm install jwt-decode@3.1.2*/



 // Import the `decode` function
 
function App() {

  const [user, setUser]= useState({});
  const [welcome,setWelcome]=useState("Sign In with your google account");
  const [isSignedIn,setIsSignedIn]=useState(false);

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setWelcome("welcome");
    setIsSignedIn(true);
   
  }

  function handleSignOut(event){
    setUser({});
    setWelcome("Sign In with your google account");
    setIsSignedIn(false);
  

  }
  useEffect(()=> {
    /* global google */
      google.accounts.id.initialize({
   
      client_id:"662686241550-9a9pun0jijj7cg73uhmomthm7rh1p5c9.apps.googleusercontent.com",
      callback:handleCallbackResponse
      });

    if(!isSignedIn){
    google.accounts.id.renderButton(

      document.getElementById('signInDiv'),
      { theme:"outline", size:"medium" ,shape:"pill"}
    );
    }
    },[isSignedIn]);

  // useEffect(() => {
  //   // Wait for the window to load before accessing 'google'
  //   window.onload = () => {
  //     if (window.google) {
  //       google.accounts.id.initialize({
  //         client_id:"662686241550-9a9pun0jijj7cg73uhmomthm7rh1p5c9.apps.googleusercontent.com",
  //         callback: handleCallbackResponse, 
  //       });
  
  //       google.accounts.id.renderButton(
  //         document.getElementById("signInDiv"),
  //         { theme: "outline", size: "medium", shape: "pill" }
  //       );
  //     } else {
  //       console.error("Google API script failed to load.");
  //     }
  //   };
  // }, []);
  

// If we have no user: sign in button
//if we have a user: show log out button
  return (
    <>
    <div className='container'>
     <h2>{welcome}</h2>
     {!isSignedIn && <div id="signInDiv"></div>}



     {isSignedIn&&user && 
     <div className='display'>
      <img src={user.picture}></img>
      
      <h3>{user.name}</h3>
      <h4>{user.email}</h4>
     </div>}
     {isSignedIn && (
        <div className="btn">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
      </div>
    </>
  )
}

export default App



{/*
  Fallback Image Handling:
To ensure your app doesn't break for users without a valid profile picture, add a fallback image.

Update your img tag like this:
  
  
  <img
  src={user.picture || "https://via.placeholder.com/150"}
  alt="Profile"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/150"; // Default image if the URL fails
  }} />*/}

