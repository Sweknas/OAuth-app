import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { secret } from '../../api'
import { User, UserState } from '../../App'
import Button from '../common/Button'

const useStyles = createUseStyles({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: { 
    backgroundColor: '#FFFFFF',
    padding: '20px 50px',
    borderRadius: 5,
    boxShadow: '0px 0px 27px 5px rgba(0, 0, 0, 0.7)'
  }
})

type Props = {
  user: User | null,
  setUser: Dispatch<SetStateAction<UserState>>
}

function Secret ({ user, setUser }: Props) {
  const classes = useStyles()
  const [ data, setData ] = useState<string | null>(null)

  const getSecret = async () => {
    if(user?.authToken) {
      const resData = await secret(user?.authToken)
      if(resData?.status === 'success' && resData.message) {
        setData(resData.message)
      } else {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }
  
  useEffect(() => {
    getSecret()
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h3>Info from backend:</h3>
        <p>{data}</p>
        <Button type='button' text='Log out' onClick={() => setUser(null)}/>
      </div>
    </div>
  )
}

export default Secret
