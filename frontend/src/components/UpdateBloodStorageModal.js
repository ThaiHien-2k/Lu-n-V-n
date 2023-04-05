import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  // FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  // Center,
  // HStack,
  // Image,
  // VStack,
  // Checkbox,
  Text,
  Select
} from '@chakra-ui/react';
// import { useDropzone } from 'react-dropzone';
import { useBloodStorageContext } from '../context/bloodStorage_context';
import axios from 'axios';
import { bloodStorages_url } from '../utils/constants';
function UpdateBloodStorageModal({ id }) {
  const {
    single_bloodStorage: {
      name = '',
      amount = '',
      from = '',
      date = '',
      detail = '',
      type = '',
      O,
      A,AB,B
      
    },
    // single_bloodstorage_loading,
    fetchBloodStorages,
    fetchSingleBloodStorage,
    updateExistingBloodStorageDetails,
    updateBloodStorage,
  } = useBloodStorageContext();


  const [loading, setLoading] = useState(false);

 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const [bloodO, setBLoodO]= useState([]);
  const [bloodA, setBLoodA]= useState([]);
  const [bloodB, setBLoodB]= useState([]);
  const [bloodAB, setBLoodAB]= useState([]);
  const getdata= async()=>{     

    const response = await axios.get(bloodStorages_url+'/getBlood');
   let ABLood =response.data.ABLood;
   let BBLood= response.data.BBLood;
   let OBLood =response.data.BBLood;
   let ABBLood =response.data.ABBLood;
  setBLoodA(ABLood);
  setBLoodO(OBLood);
  setBLoodAB(ABBLood);
  setBLoodB(BBLood);
  // bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o);
 console.log(bloodA);
}
getdata();

  const handleSubmit = async () => {
    if (
      !name ||
      !amount ||
      !from ||
      !date||
      !type ||
      !detail 
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (
      type == 'Cho' &&
      bloodA < A 
    
    ) {
      return toast({
        position: 'top',
        description: 'Chỉ còn lại '+ bloodA +'ml máu A',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (
      type == 'Cho' &&
      bloodB < B 
    
    ) {
      return toast({
        position: 'top',
        description: 'Chỉ còn lại '+ bloodB +'ml máu B',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (
      type == 'Cho' &&
      bloodAB < AB 
    
    ) {
      return toast({
        position: 'top',
        description: 'Chỉ còn lại '+ bloodAB +'ml máu AB',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (
      type == 'Cho' &&
      bloodO < O 
    
    ) {
      return toast({
        position: 'top',
        description: 'Chỉ còn lại '+ bloodO +'ml máu O',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    const bloodStorage = {
      name,
      amount,
      from,
      date,
      detail,
      type, O,
      A,AB,B
    };
    const responseCreate = await updateBloodStorage(id, bloodStorage);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'bloodstorage updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchBloodStorages();
    } else {
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

 
  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleBloodStorage(id);
          onOpen();
        }}
      >
        Chỉnh Sửa
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tên</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Họ và tên'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingBloodStorageDetails}
              />
            </FormControl>

           

            {/* <FormControl mt={4}>
              <FormLabel>Số lượng</FormLabel>
              <Input
                type='number'
                placeholder='CMND/CCCD'
                name='amount'
                focusBorderColor='brown.500'
                value={amount}
                onChange={updateExistingBloodStorageDetails}
              />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>Từ/Đến</FormLabel>
              <Input
            
                placeholder='Số lần hỗ trợ'
                name='from'
                focusBorderColor='brown.500'
                value={from}
                onChange={updateExistingBloodStorageDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
              
                name='detail'
                focusBorderColor='brown.500'
                value={detail}
                onChange={updateExistingBloodStorageDetails}
              />
            </FormControl>

          
            

            <FormControl>
            <FormLabel>Ngày thực hiện</FormLabel>
              <Input
                ref={initialRef}
                type='date'
                name='date'
                focusBorderColor='brown.500'
                value={date}
                onChange={updateExistingBloodStorageDetails}
              />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Chọn máu</FormLabel>
            Máu O:
              <Input
             
                // placeholder='Máu O'
                name='O'
                focusBorderColor='brown.500'
                value={O}
                onChange={updateExistingBloodStorageDetails}
              />
              Máu A:
              <Input
             
            //  placeholder='Máu A'
             name='A'
             focusBorderColor='brown.500'
             value={A}
             onChange={updateExistingBloodStorageDetails}
           />
           Máu AB:
           <Input
             
            //  placeholder='Máu AB'
             name='AB'
             focusBorderColor='brown.500'
             value={AB}
             onChange={updateExistingBloodStorageDetails}
           />
           Máu B:
           <Input
             
            //  placeholder='Máu B'
             name='B'
             focusBorderColor='brown.500'
             value={B}
             onChange={updateExistingBloodStorageDetails}
           />
            </FormControl>
            
            
      

            
            <FormControl mt={4}>
            <FormLabel>Loại</FormLabel>
              <Select
                name='type'
                focusBorderColor='brown.500'
                value={type}
                onChange={updateExistingBloodStorageDetails}
              >
                 <option value='Nhận'>Nhận</option>
                <option value='Cho'>Cho</option>
              
              </Select>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating BloodStorage'
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateBloodStorageModal;
