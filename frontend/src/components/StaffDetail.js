import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Text,
  Box,
  SimpleGrid,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useStaffContext } from '../context/staff_context';
import { bloodDonates_url } from '../utils/constants';
import { useBloodDonateContext } from '../context/bloodDonate_context';
import { Stars } from '.';
import moment from 'moment';
import axios from 'axios';

function StaffDetail({ staff }) {
  const { admins } = useAdminContext();

  // const { single_staff_loading: loading } = useStaffContext();
  // const [createdBy, setCreatedBy] = useState('');
  // const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    countryID='',
    address='',
    phone,
    from,
    type,
    suppostTime,
  } = staff;

  const {
    bloodDonates,
    bloodDonates_loading: loading,
    bloodDonates_error: error,
    fetchBloodDonates,
  } = useBloodDonateContext();

  const [suppost, setSuppost] = useState([]);



    useEffect(()=>{
      const getdata =  () => {
   
        setSuppost(bloodDonates.filter(index=> index.staffList.includes(id)));

    console.log(suppost);
  }

      

  getdata();
      },[]);



  

  return (
    <VStack alignItems='left' justifyContent='left'>
      <Text as='b'>THÔNG TIN NHÂN VIÊN</Text>
       <VStack alignItems='left' justifyContent='left'>
      <HStack><Text as='b'>CMND/CCCD: </Text><Text>{countryID}</Text></HStack>
     <HStack> <Text as='b'>Họ và tên: </Text><Text>{name}</Text></HStack>
     <HStack> <Text as='b'>Địa chỉ: </Text><Text>{address}</Text></HStack>
     <HStack><Text as='b'>Số điện thoại: </Text><Text>{phone}</Text></HStack>
     <HStack><Text as='b'>Đơn vị: </Text><Text>{from}</Text></HStack>
     <HStack> <Text as='b'>Loại nhân viên: </Text><Text>{type}</Text></HStack>
     <HStack>  <Text as='b'>Số lần hỗ trợ: </Text><Text>{suppostTime}</Text></HStack>
     </VStack>
     <VStack></VStack>
     <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
     <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>Lần hỗ trợ</Th>
              <Th>Tên buổi hiến</Th>
              <Th>Thời gian</Th>
              <Th>Địa điểm</Th>

            </Tr>
          </Thead>
          <Tbody>
            {suppost.map((sup, index) => {
              const {  name, time, address,staffList } =
              sup;
                // console.log(staffList.map(index=>index))
                // console.log(id)
               
              return (
                 
                <Tr key={index}>
                   <Td>{index+1}</Td>
                <Td>{name}</Td>
                  <Td>{moment(time).format("MM:HHA D/M/YYYY")}</Td>
                  <Td>{address}</Td>
        
                </Tr>
              );
             
            })}
          </Tbody>
        </Table>
        </SimpleGrid>
    </VStack>
  );
}

export default StaffDetail;
