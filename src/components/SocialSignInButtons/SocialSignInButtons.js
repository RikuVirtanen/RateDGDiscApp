import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

export default function SocialSignInButtons() {

    const onSignInFacebook = () => {
        console.warn("signInFacebookPressed");
    }

    const onSignInGoogle = () => {
        console.warn("signInGooglePressed");
    }
    
    return (
        <>
            <CustomButton 
                    text="Sign In with Facebook" 
                    onPress={ onSignInFacebook } 
                    bgColor="#E7EAF4"
                    fgColor="#4765A9"
                />
                <CustomButton 
                    text="Sign In with Google" 
                    onPress={ onSignInGoogle } 
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
        </>
    )
}