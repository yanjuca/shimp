import {useEffect} from 'react'

let users = []

async function getUsers(){
  const userfromApi=await api.get('/usuarios')

 user= userfromApi.data
  useEffect(() => {
   getUsers()
  }, [])
}