import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Input/CustomInput';
import CustomArea from '../../components/Input/CustomArea';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import SubmitButton from '../../components/Button/SubmitButton';
import { API_URL } from '../../constants/ApiConstant';
import axios from 'axios';

//on veut faire un formulaire titre, description, submit
const AddNote:React.FC = () => {

  // on déclare nos states
  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [isloading, setIsLoading] = useState<boolean>(false);

  //on recupere l'id de l'user
  const {userId} = useAuthContext();

  // il faut recuperer le hook de navigation
  const navigate = useNavigate();

  //méthode pour enregistrer une nouvelle note
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, '||| ' + description)

    // on crée notre objet Note avec les valeurs des states
    const newNote = {
      title: title,
      description: description,
      createdAt: new Date(),
      user: `/api/users/${userId}`
    }
    
    // on definit les parametres des headers
    const headers = {
      'Content-Type': 'application/ld+json',
    }
  
    try {
      setIsLoading(true);
      await axios.post(`${API_URL}/notes`, newNote, {headers}).then((response)=>{
        if(response.status === 201){
          setIsLoading(false);
          navigate('/');
        }
      }).catch((error)=>{
        console.log(`Erreur lors de l'enregistrement de la nouvelle note : ${error}`);
        setIsLoading(false);
      })
    } catch (error) {
      console.log(`Erreur lors de l'enregistrement de la nouvelle note : ${error}`);
      setIsLoading(false);
    }

  }


  return (
    <div className='flex flex-col items-center justify-start pt-5 min-w-64'>
      <h1 className='text-3xl font-bold text-white py-3'>Ajouter une nouvelle note</h1>
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

export default AddNote