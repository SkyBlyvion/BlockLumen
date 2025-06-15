import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchNotes } from '../../redux/note/noteSlice';
import { selectNoteData } from '../../redux/note/noteSelector';
import PageLoader from '../../components/Loader/PageLoader';
import { BsTrash } from 'react-icons/bs';
import { deleteNote } from '../../services/noteService';
import { useAuthContext } from '../../contexts/AuthContext';
import EmptyNote from '../../components/Misc/EmptyNote';
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {

  // on récupére le hook useDispatch pour executer le fetchNotes
  const dispatch: AppDispatch = useDispatch();

  // on recupere l'user id pour fetchnotes deuis le contexte d(auth)
  const {userId} = useAuthContext();

  const navigate = useNavigate();


  // a chaque dispatch on remet a jour le fetchnotes
  useEffect(() => {
    dispatch(fetchNotes(userId))
  }, [dispatch])

  const { loading, notes } = useSelector(selectNoteData);

  // update notes and autoF5, no need to f5
  const handleDelete = async (id:number) => {
    if(await deleteNote(id)){
      dispatch(fetchNotes(userId))
    }
  }

  const handleEdit = (id:number) => {
    navigate(`/edit/${id}`)
  }

  // console.log('aaaaaaa', notes)

  return (

    loading ? <PageLoader /> :
    notes.length == 0 ? <EmptyNote /> :
      <div className='h-screen flex flex-col items-center justify-start bg-brown_dark pt-5'>
        <h1 className='text-3xl font-bold text-white py-3'>Toutes les notes</h1>
        <div className='flex flex-wrap justify-center md:justify-start'>
          {notes && notes.map((note) => (
            <div key={note.id} className='w-[250px] p-3 relative '>
              <div className='h-full bg-yellow p-3 rounded-lg flex flex-col '>
                <h2 className='text-xl font-bold text-brown'>{note.title}</h2>
                <p className='text-brown_dark flex-grow'>{note.description}</p>
                <div className='flex justify-between items-center mt-3'>
                  <p className='text-brown_dark text-sm '>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  <BsTrash onClick={()=>{handleDelete(note.id)}} className='text-red_dark cursor-pointer h-5 w-5' />
                  <CiEdit onClick={()=>{handleEdit(note.id)}} className='text-red_dark cursor-pointer h-7 w-7' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

  )
}

export default Home