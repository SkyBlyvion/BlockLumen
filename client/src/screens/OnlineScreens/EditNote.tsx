import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/Input/CustomInput'
import CustomArea from '../../components/Input/CustomArea'
import SubmitButton from '../../components/Button/SubmitButton'
import ButtonLoader from '../../components/Loader/ButtonLoader'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../constants/ApiConstant'

const EditNote:React.FC = () => {

  // on déclare nos states
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(false);
  //on recupere l'id de l'user
  const {userId} = useAuthContext();
  // il faut recuperer le hook de navigation
  const navigate = useNavigate();
  // id de la note par url
  const { noteId } = useParams();


  useEffect(() => {
    // Fonction pour charger les données de la note existante
    const fetchNote = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/notes/${noteId}`);
        if (response.status === 200) {
          setTitle(response.data.title);
          setDescription(response.data.description);
        }
      } catch (error) {
        console.error(`Erreur lors du chargement de la note : ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  const updatedNote = {
    title: title,
    description: description,
    updatedAt: new Date(),
  };


  return (
    <div className='flex flex-col items-center justify-start pt-5 min-w-64'>
      <h1 className='text-3xl font-bold text-white py-3'>éditer une note</h1>
      <form onSubmit={handleSubmit}>
        {/* input title */}
        <CustomInput 
          state={title} 
          label='Titre de la note' 
          type='text' 
          callable={(e) => setTitle(e.target.value)}
        />
        {/* input description */}
        <CustomArea 
          state={description} 
          label='Description de la note' 
          callable={(newValue: string) => setDescription(newValue)}
        />
        {/* submit button */}
        {isloading ? <ButtonLoader/> : 
        <SubmitButton label='Enregistrer' />}
      </form>
    </div>
  )
}

export default EditNote