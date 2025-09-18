import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const API_BASE_URL = "http://10.110.12.39:3000/appointments";

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState('pendente');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Buscar todos os compromissos
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar compromissos:", error.message);
    }
  };

  // Criar um novo compromisso
  const createAppointment = async () => {
    try {
      const appointmentData = {
        title,
        notes,
        date: date.toISOString().split('T')[0],
        time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status
      };

      await axios.post(API_BASE_URL, appointmentData);
      resetForm();
      setModalVisible(false);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao criar compromisso:", error.message);
    }
  };

  // Atualizar um compromisso existente
  const updateAppointment = async () => {
    try {
      const appointmentData = {
        title,
        notes,
        date: date.toISOString().split('T')[0],
        time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status
      };

      await axios.put(`${API_BASE_URL}/${editingAppointment.id}`, appointmentData);
      resetForm();
      setModalVisible(false);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao atualizar compromisso:", error.message);
    }
  };

  // Excluir um compromisso
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao excluir compromisso:", error.message);
    }
  };

  // Limpar o formulário
  const resetForm = () => {
    setTitle('');
    setNotes('');
    setDate(new Date());
    setTime(new Date());
    setStatus('pendente');
    setEditingAppointment(null);
  };

  // Abrir modal para edição
  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setTitle(appointment.title);
    setNotes(appointment.notes);
    setDate(new Date(appointment.date));
    setTime(new Date(`2000-01-01T${appointment.time}`));
    setStatus(appointment.status);
    setModalVisible(true);
  };

  // Fechar modal e limpar formulário
  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  // Formatar data para exibição
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Obter cor baseada no status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return '#FFA500';
      case 'agendado': return '#1E90FF';
      case 'concluído': return '#32CD32';
      default: return '#666';
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agenda de Compromissos</Text>
      
      <Button title="Novo Compromisso" onPress={() => setModalVisible(true)} />
      
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.appointmentTitle}>{item.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.appointmentNotes}>{item.notes}</Text>
            
            <View style={styles.appointmentDetails}>
              <Text style={styles.detailText}>Data: {formatDate(item.date)}</Text>
              <Text style={styles.detailText}>Hora: {item.time}</Text>
            </View>
            
            <View style={styles.appointmentActions}>
              <Button title="Editar" onPress={() => openEditModal(item)} />
              <Button title="Excluir" color="#FF4500" onPress={() => deleteAppointment(item.id)} />
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingAppointment ? 'Editar Compromisso' : 'Novo Compromisso'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Título do compromisso"
            value={title}
            onChangeText={setTitle}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Anotações"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Data:</Text>
            <Button 
              title={date.toLocaleDateString('pt-BR')} 
              onPress={() => setShowDatePicker(true)} 
            />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Hora:</Text>
            <Button 
              title={time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
              onPress={() => setShowTimePicker(true)} 
            />
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}
          </View>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Status:</Text>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pendente" value="pendente" />
              <Picker.Item label="Agendado" value="agendado" />
              <Picker.Item label="Concluído" value="concluído" />
            </Picker>
          </View>
          
          <View style={styles.modalButtons}>
            <Button
              title={editingAppointment ? "Atualizar" : "Criar"}
              onPress={editingAppointment ? updateAppointment : createAppointment}
            />
            <Button title="Cancelar" color="#666" onPress={closeModal} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    marginTop: 20,
  },
  appointmentItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 12,
    color: '#888',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  modalButtons: {
    marginTop: 20,
    gap: 10,
  },
});