// import React,{useCallback, useEffect, useState} from 'react'
// import api from '../services/api'
// import moment from 'moment';

// /* eslint-disable no-unused-vars */

// export default function Message({loggedInUser}) {

//   const [user,setUser]=useState(null)
//   const[error,setError]=useState(null)
//   const[token,setToken]=useState(null)
//   const[message,setMessages]=useState([])
//   const[newMsg,setNewMsg]=useState('')
//   const [receiver,setReciver]=useState()


//   // Fetch User
//   const profile=async()=>{
//     const storedToken = sessionStorage.getItem('token');
//       if (!storedToken) {
//         setError('No authentication token found');
//         return;
//       }
//       setToken(storedToken);
//     try{
//       const response=await api.get('/api/auth/user',{
//         headers:{
//           'Authorization':`Bearer ${storedToken}`
//         }
//       })
//       setUser(response.data)
//     }catch(error){
//       setError(error.message)
//       console.error(error)
//     }
//   }
//   useEffect(()=>{
//     profile()
//   },[])

//   //fetch messages

//   const getMessage=useCallback(async()=>{
//     if(!user || !user._id || !token) return;
//     try {
//       const response=await api.get(`/api/messages/${user._id}/`,{
//         headers:{
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       setMessages(response.data)
//       console.log(response.data);
//     } catch (error) {
//       setError(error)
//     }
//   },[user,token])

//   useEffect(() => {
//     if (user && token) {
//       getMessage(); 
//     }
//   }, [user, token,getMessage]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMsg || newMsg.trim() === '') return;
//     try {
//       const response = await api.post('/api/messages/', { newMsg, receiver }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//       setNewMsg('');
//     } catch (error) {
//       // Handle error
//       setError(error.message);
//       console.error(error);
//     }
//   };

//   const messageStyles = {
//     message: {
//       padding: '10px',
//       border: '1px solid #ddd',
//       marginBottom: '10px',
//       backgroundColor: '#f9f9f9',
//       borderRadius: '5px',
//       maxWidth: '60%',
//       display: 'flex',
//       flexDirection: 'column',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//     senderMessage: {
//       alignSelf: 'flex-end',
//       backgroundColor: '#dcf8c6', // Light green background
//       textAlign: 'right',
//     },
//     receiverMessage: {
//       alignSelf: 'flex-start',
//       backgroundColor: '#f1f0f0', // Light gray background
//       textAlign: 'left',
//     },
//     messageHeader: {
//       display: 'flex',
//       alignItems: 'center',
//     },
//     profilePicture: {
//       width: '50px',
//       height: '50px',
//       borderRadius: '50%',
//       marginRight: '10px',
//     },
//     messageContent: {
//       fontSize: '14px',
//       color: '#333',
//     },
//     smallText: {
//       display: 'block',
//       color: '#777',
//       fontSize: '12px',
//       marginTop: '5px',
//     },
//   };

//   if(error) return <p>{error}</p>

//   return (
//     <>
//       {message.map((msg) => (
//         <div
//           key={msg._id}
//           style={{
//             ...messageStyles.message,
//             ...(msg.sender._id === loggedInUser._id
//               ? messageStyles.senderMessage
//               : messageStyles.receiverMessage),
//           }}
//         >
//           <div style={messageStyles.messageHeader}>
//             <img
//               src={`http://localhost:8000/uploads/${msg.sender.photo}`}
//               alt={msg.sender.username}
//               style={messageStyles.profilePicture}
//             />
//             <strong>{msg.sender.username}</strong> →{' '}
//             <strong>{msg.receiver.username}</strong>
//           </div>
//           <p style={messageStyles.messageContent}>{msg.content}</p>
//           <small style={messageStyles.smallText}>
//             {moment(msg.createdAt).format('MM/DD/YYYY, hh:mm')}
//           </small>
//         </div>
//       ))}
//       <hr />
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setNewMsg(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>

//     </>
//   )
// }
