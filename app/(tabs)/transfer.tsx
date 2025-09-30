import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Users, Send, Smartphone, Building2, QrCode } from 'lucide-react-native';

export default function TransferScreen() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [step, setStep] = useState(1);
  const [transferData, setTransferData] = useState({
    method: '',
    recipient: '',
    amount: '',
    note: ''
  });

  const transferMethods = [
    { id: 'contact', icon: Users, title: 'Vers un contact', subtitle: 'Numéro de téléphone' },
    { id: 'bank', icon: Building2, title: 'Compte bancaire', subtitle: 'First Bank ou autre banque' },
    { id: 'mobile', icon: Smartphone, title: 'Mobile Money', subtitle: 'Orange, Airtel, Vodacom' },
    { id: 'qr', icon: QrCode, title: 'Code QR', subtitle: 'Scanner pour transférer' },
  ];

  const recentContacts = [
    { id: 1, name: 'Marie Kabila', phone: '+243 89X XXX XXX', avatar: 'MK' },
    { id: 2, name: 'Joseph Mukendi', phone: '+243 97X XXX XXX', avatar: 'JM' },
    { id: 3, name: 'Grace Mbuyi', phone: '+243 85X XXX XXX', avatar: 'GM' },
  ];

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setTransferData({ ...transferData, method });
    setStep(2);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((stepNumber) => (
        <View key={stepNumber} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            step >= stepNumber && styles.stepCircleActive
          ]}>
            <Text style={[
              styles.stepNumber,
              step >= stepNumber && styles.stepNumberActive
            ]}>
              {stepNumber}
            </Text>
          </View>
          {stepNumber < 3 && (
            <View style={[
              styles.stepLine,
              step > stepNumber && styles.stepLineActive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>Choisir le type de transfert</Text>
      <View style={styles.methodsContainer}>
        {transferMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.methodItem}
            onPress={() => handleMethodSelect(method.id)}
          >
            <View style={styles.methodIcon}>
              <method.icon size={24} color="#1E40AF" />
            </View>
            <View style={styles.methodContent}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
            </View>
            <View style={styles.methodArrow}>
              <Send size={16} color="#9CA3AF" rotation={-45} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recentContactsContainer}>
        <Text style={styles.recentTitle}>Contacts récents</Text>
        {recentContacts.map((contact) => (
          <TouchableOpacity key={contact.id} style={styles.contactItem}>
            <View style={styles.contactAvatar}>
              <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>Détails du transfert</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Destinataire</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Numéro de téléphone ou nom"
          value={transferData.recipient}
          onChangeText={(text) => setTransferData({ ...transferData, recipient: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Montant</Text>
        <TextInput
          style={styles.textInput}
          placeholder="0 FC"
          value={transferData.amount}
          onChangeText={(text) => setTransferData({ ...transferData, amount: text })}
          keyboardType="numeric"
        />
        <View style={styles.quickAmounts}>
          {['5,000', '10,000', '25,000', '50,000'].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickAmountButton}
              onPress={() => setTransferData({ ...transferData, amount })}
            >
              <Text style={styles.quickAmountText}>{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Note (optionnel)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Raison du transfert"
          value={transferData.note}
          onChangeText={(text) => setTransferData({ ...transferData, note: text })}
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
        <Text style={styles.primaryButtonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>Confirmer le transfert</Text>
      
      <View style={styles.confirmationCard}>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Destinataire</Text>
          <Text style={styles.confirmationValue}>{transferData.recipient}</Text>
        </View>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Montant</Text>
          <Text style={styles.confirmationValue}>{transferData.amount} FC</Text>
        </View>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Frais</Text>
          <Text style={styles.confirmationValue}>500 FC</Text>
        </View>
        <View style={[styles.confirmationRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total à débiter</Text>
          <Text style={styles.totalValue}>
            {parseInt(transferData.amount.replace(/,/g, '') || '0') + 500} FC
          </Text>
        </View>
      </View>

      <View style={styles.securityNote}>
        <Text style={styles.securityText}>
          🔒 Ce transfert sera sécurisé par votre empreinte digitale
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Confirmer avec empreinte</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfert d'argent</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#1E40AF',
  },
  stepNumber: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#1E40AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  methodsContainer: {
    marginBottom: 32,
  },
  methodItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  methodSubtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  methodArrow: {
    marginLeft: 8,
  },
  recentContactsContainer: {
    marginBottom: 20,
  },
  recentTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactPhone: {
    color: '#6b7280',
    fontSize: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  quickAmountButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  quickAmountText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  confirmationCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  confirmationLabel: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmationValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '700',
  },
  securityNote: {
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  securityText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});