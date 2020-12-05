import React, { useRef } from 'react'
import sha256 from 'crypto-js/sha256';
import { TextField } from '@material-ui/core'
//import hmacSHA512 from 'crypto-js/hmac-sha512';
//import Base64 from 'crypto-js/enc-base64';

const EncryptText = () => {
  const nonce="1", path="/", privateKey = "sdadasdaweqe123123ed21dr1231f13f"; 
  const container = useRef()
  //const toBase64 = (sha) => Base64.stringify(hmacSHA512(path + sha, privateKey));
  function handleChange(e) {
    if (e.target.value !== '') container.current.innerHTML = `sha256 -- \n ${sha256(e.target.value)}`
    else container.current.innerHTML = ''
  } 

  return (
    <>
      <div><TextField id="standard-basic" label="Standard" onChange={handleChange} /></div>
      <div ref={container}></div>
    </>
  )
}

export default EncryptText