import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fingerprint, Shield } from 'lucide-react-native';

interface BiometricPromptProps {
  visible: boolean;
  onAuthenticate: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

export default function BiometricPrompt({ 
  visible, 
  onAuthenticate, 
  onCancel,
  title = "Authentification biométrique",
  subtitle = "Utilisez votre empreinte digitale pour confirmer"
}: BiometricPromptProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <Shield size={32} color="#1E40AF" />
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <TouchableOpacity style={styles.fingerprintButton} onPress={onAuthenticate}>
          <Fingerprint size={48} color="#1E40AF" />
          <Text style={styles.fingerprintText}>Toucher le capteur</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    width: '85%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  fingerprintButton: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: '#1E40AF',
    borderRadius: 16,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  fingerprintText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
});