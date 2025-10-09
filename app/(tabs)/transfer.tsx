import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar, Animated, Alert } from 'react-native';
import { ArrowLeft, Users, Send, Smartphone, Building2, QrCode, Search, Check, Shield, ArrowUpRight, Fingerprint, X, ChevronRight } from 'lucide-react-native';
import BiometricPrompt from '../../components/BiometricPrompt';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function TransferScreen() {
  // Réduire à 2 étapes au lieu de 3
  const [step, setStep] = useState(1);
  const [transferData, setTransferData] = useState({
    recipient: '',
    recipientType: '', // 'contact', 'mobile', 'bank' - détecté automatiquement
    amount: '',
    note: '',
    lastTransferAmount: '',
    recipientPhone: '',
    recipientProvider: '',
    useLastAmount: false // Pour les transferts rapides avec le dernier montant
  });
  
  // États pour les animations et l'expérience utilisateur
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{
    id: number;
    name: string;
    phone: string;
    avatar: string;
    type: string;
    provider: string;
    lastAmount: string;
    frequency: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferAnimation] = useState(new Animated.Value(0));
  const [recipientDetected, setRecipientDetected] = useState(false);

  // Contacts récents avec leurs montants habituels
  const recentContacts = [
    { id: 1, name: 'Marie Kabila', phone: '+243 89X XXX XXX', avatar: 'MK', type: 'mobile', provider: 'Airtel', lastAmount: '50,000', frequency: 'high' },
    { id: 2, name: 'Joseph Mukendi', phone: '+243 97X XXX XXX', avatar: 'JM', type: 'contact', provider: 'First Bank', lastAmount: '25,000', frequency: 'medium' },
    { id: 3, name: 'Grace Mbuyi', phone: '+243 85X XXX XXX', avatar: 'GM', type: 'mobile', provider: 'Orange', lastAmount: '12,500', frequency: 'low' },
  ];
  
  // Montants fréquemment utilisés
  const commonAmounts = ['5,000', '10,000', '25,000', '50,000', '100,000'];

  // Détecter automatiquement le type de destinataire
  const detectRecipientType = (input: string) => {
    // Format de numéro de téléphone congolais
    const phoneRegex = /^\+?243[0-9]{9}$/;
    // Format de compte bancaire (simplifié)
    const bankRegex = /^[0-9]{10,16}$/;
    
    if (phoneRegex.test(input.replace(/\s/g, ''))) {
      // Détecter l'opérateur mobile
      const prefix = input.replace(/\s/g, '').substring(3, 5);
      if (['81', '82', '83', '84', '85', '89', '90'].includes(prefix)) {
        return { type: 'mobile', provider: 'Vodacom' };
      } else if (['99', '97', '91', '80'].includes(prefix)) {
        return { type: 'mobile', provider: 'Airtel' };
      } else if (['89', '88', '87', '86'].includes(prefix)) {
        return { type: 'mobile', provider: 'Orange' };
      }
      return { type: 'mobile', provider: 'Autre' };
    } else if (bankRegex.test(input.replace(/\s/g, ''))) {
      return { type: 'bank', provider: 'First Bank' };
    }
    
    return { type: '', provider: '' };
  };

  // Sélectionner un contact récent
  const handleContactSelect = (contact: { 
    phone: string;
    name: string;
    type?: string;
    provider?: string;
    lastAmount?: string;
  }) => {
    const { type, provider } = detectRecipientType(contact.phone);
    setTransferData({
      ...transferData,
      recipient: contact.name,
      recipientPhone: contact.phone,
      recipientType: contact.type || type,
      recipientProvider: contact.provider || provider,
      lastTransferAmount: contact.lastAmount || ''
      // Styles pour l'écran de succès
});

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  successAmount: {
    color: '#1E40AF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  successMessage: {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 32,
  },
  successDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 32,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  successLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  successValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  successActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  successActionButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginHorizontal: 6,
  },
  successActionButtonPrimary: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  successActionText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  successActionTextPrimary: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
    setRecipientDetected(true);
  };

  // Gérer la recherche de contacts/destinataires
  const handleSearch = (text: string) => {
    setTransferData({ ...transferData, recipient: text   // Styles pour l'écran de succès
});

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  successAmount: {
    color: '#1E40AF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  successMessage: {
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 32,
  },
  successDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 32,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  successLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  successValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  successActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  successActionButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginHorizontal: 6,
  },
  successActionButtonPrimary: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  successActionText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  successActionTextPrimary: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
    
    if (text.length > 2) {
      setIsSearching(true);
      // Simuler une recherche
      const results = recentContacts.filter(contact => 
        contact.name.toLowerCase().includes(text.toLowerCase()) || 
        contact.phone.replace(/\s/g, '').includes(text.replace(/\s/g, ''))
      );
      setSearchResults(results as Array<{
        id: number;
        name: string;
        phone: string;
        avatar: string;
        type: string;
        provider: string;
        lastAmount: string;
        frequency: string;
      }>);
      
      // Détecter automatiquement le type
      const { type, provider } = detectRecipientType(text);
      if (type) {
        setTransferData(prev => ({
          ...prev,
          recipientType: type,
          recipientProvider: provider
        }));
        setRecipientDetected(true);
      } else {
        setRecipientDetected(false);
      }
    } else {
      setIsSearching(false);
      setSearchResults([]);
      setRecipientDetected(false);
    }
  };

  // Navigation entre les étapes
  const handleNext = () => {
    if (step === 1 && (!transferData.recipient || !recipientDetected)) {
      // Validation de l'étape 1
      Alert.alert('Information manquante', 'Veuillez saisir un destinataire valide.');
      return;
    }
    
    if (step === 1 && !transferData.amount) {
      Alert.alert('Information manquante', 'Veuillez saisir un montant.');
      return;
    }
    
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (transferSuccess) {
      // Réinitialiser en cas de succès
      setTransferSuccess(false);
      setTransferData({
        recipient: '',
        useLastAmount: false,
        recipientType: '',
        amount: '',
        note: '',
        lastTransferAmount: '',
        recipientPhone: '',
        recipientProvider: ''
      });
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Confirmer le transfert avec biométrie
  const handleConfirm = () => {
    setShowBiometric(true);
  };
  
  // Simuler l'authentification biométrique
  const handleAuthenticate = () => {
    setShowBiometric(false);
    setIsLoading(true);
    
    // Simuler un délai de traitement
    setTimeout(() => {
      setIsLoading(false);
      setTransferSuccess(true);
      
      // Animation de succès
      Animated.timing(transferAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }, 1500);
  };

  // Indicateur de progression (2 étapes au lieu de 3)
  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2].map((stepNumber) => (
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
          {stepNumber < 2 && (
            <View style={[
              styles.stepLine,
              step > stepNumber && styles.stepLineActive
            ]} />
          )}
        </View>
      ))}
    </View>
  );
  
  // Afficher le type de destinataire détecté
  const renderRecipientType = () => {
    if (!recipientDetected) return null;
    
    let icon, color, text;
    
    switch(transferData.recipientType) {
      case 'mobile':
        icon = <Smartphone size={16} color="#7C3AED" />;
        color = '#7C3AED20';
        text = `Mobile Money - ${transferData.recipientProvider || 'Détecté'}`;
        break;
      case 'bank':
        icon = <Building2 size={16} color="#1E40AF" />;
        color = '#1E40AF20';
        text = `Compte bancaire - ${transferData.recipientProvider || 'Détecté'}`;
        break;
      case 'contact':
        icon = <Users size={16} color="#059669" />;
        color = '#05966920';
        text = 'Contact First Bank';
        break;
      default:
        return null;
    }
    
    return (
      <View style={[styles.recipientTypeBadge, { backgroundColor: color }]}>
        {icon}
        <Text style={styles.recipientTypeText}>{text}</Text>
      </View>
    );
  };

  // Étape 1: Saisie unifiée du destinataire et du montant
  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>Transfert d'argent</Text>
      
      {/* Champ de recherche unifié */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Search size={20} color="#9CA3AF" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Nom, numéro ou compte bancaire"
          value={transferData.recipient}
          onChangeText={handleSearch}
        />
      </View>
      
      {/* Badge de type détecté */}
      {renderRecipientType()}
      
      {/* Résultats de recherche */}
      {isSearching && searchResults.length > 0 && (
        <View style={styles.searchResults}>
          {searchResults.map((contact) => (
            <TouchableOpacity 
              key={contact.id} 
              style={styles.searchResultItem}
              onPress={() => handleContactSelect(contact)}
            >
              <View style={styles.contactAvatar}>
                <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
                {contact.lastAmount && (
                  <View style={styles.lastTransferBadge}>
                    <ArrowUpRight size={12} color="#6B7280" />
                    <Text style={styles.lastTransferText}>Dernier: {contact.lastAmount} FC</Text>
                  </View>
                )}
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {/* Contacts récents avec raccourcis */}
      {!isSearching && (
        <View style={styles.recentContactsContainer}>
          <Text style={styles.recentTitle}>Contacts récents</Text>
          {recentContacts.map((contact) => (
            <TouchableOpacity 
              key={contact.id} 
              style={styles.contactItem}
              onPress={() => handleContactSelect(contact)}
            >
              <View style={[styles.contactAvatar, contact.frequency === 'high' ? styles.frequentContact : null]}>
                <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <View style={styles.contactMeta}>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  {contact.frequency === 'high' && (
                    <View style={styles.frequentBadge}>
                      <Text style={styles.frequentBadgeText}>Fréquent</Text>
                    </View>
                  )}
                </View>
                {contact.lastAmount && (
                  <TouchableOpacity 
                    style={styles.quickSendButton}
                    onPress={() => {
                      handleContactSelect(contact);
                      setTransferData(prev => ({ ...prev, amount: contact.lastAmount }));
                    }}
                  >
                    <Text style={styles.quickSendText}>Envoyer {contact.lastAmount} FC</Text>
                    <Send size={12} color="#1E40AF" rotation={-45} />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {/* Montant */}
      {recipientDetected && (
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Montant</Text>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              value={transferData.amount}
              onChangeText={(text) => setTransferData({ ...transferData, amount: text })}
              keyboardType="numeric"
            />
            <Text style={styles.currencyText}>FC</Text>
          </View>
          
          {/* Montants rapides */}
          <View style={styles.quickAmounts}>
            {commonAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[styles.quickAmountButton, transferData.amount === amount && styles.quickAmountButtonActive]}
                onPress={() => setTransferData({ ...transferData, amount })}
              >
                <Text style={[styles.quickAmountText, transferData.amount === amount && styles.quickAmountTextActive]}>
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Note */}
          <View style={styles.container}>
            <Text style={{
              color: '#374151',
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 8,
            }}>Note (optionnel)</Text>
            <TextInput
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                color: '#111827',
                fontSize: 16
              }}
              placeholder="Raison du transfert"
              value={transferData.note}
              onChangeText={(text) => setTransferData({ ...transferData, note: text })}
            />
          </View>
          
          {/* Bouton continuer */}
          <TouchableOpacity 
            style={[{
              backgroundColor: (!transferData.recipient || !transferData.amount) ? '#E5E7EB' : '#1E40AF',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24
            }]}
            onPress={handleNext}
            disabled={!transferData.recipient || !transferData.amount}
          >
            <Text style={{
              color: '#ffffff',
              fontSize: 16,
              fontWeight: '600'
            }}>Continuer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // Étape 2: Confirmation du transfert
  const renderStep2 = () => {
    // Calculer le montant total avec frais
    const amount = parseInt(transferData.amount.replace(/,/g, '') || '0');
    const fees = 500; // Frais fixes de 500 FC
    const total = amount + fees;
    
    return (
      <View>
        <Text style={styles.stepTitle}>Confirmer le transfert</Text>
        
        {/* Carte de confirmation avec design amélioré */}
        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 20,
          marginVertical: 16,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {/* En-tête avec destinataire */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#1E40AF',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}>
              <Text style={{
                color: '#ffffff',
                fontSize: 14,
                fontWeight: '600'
              }}>
                {transferData.recipient.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={{
              flex: 1,
              marginLeft: 12
            }}>
              <Text style={{
                color: '#111827',
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 2,
              }}>{transferData.recipient}</Text>
              <Text style={{
                color: '#6b7280',
                fontSize: 12
              }}>{transferData.recipientPhone}</Text>
              {renderRecipientType()}
            </View>
          </View>
          
          <View style={{
            height: 1,
            backgroundColor: '#e5e7eb',
            marginVertical: 16
          }} />
          
          {/* Détails du transfert */}
          <View style={styles.confirmationDetails}>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmationLabel}>Montant</Text>
              <Text style={styles.confirmationValue}>{transferData.amount} FC</Text>
            </View>
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmationLabel}>Frais</Text>
              <Text style={styles.confirmationValue}>{fees.toLocaleString()} FC</Text>
            </View>
            {transferData.note && (
              <View style={styles.confirmationRow}>
                <Text style={styles.confirmationLabel}>Note</Text>
                <Text style={styles.confirmationValue}>{transferData.note}</Text>
              </View>
            )}
            <View style={[styles.confirmationRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total à débiter</Text>
              <Text style={styles.totalValue}>{total.toLocaleString()} FC</Text>
            </View>
          </View>
        </View>
        
        {/* Note de sécurité améliorée */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#EBF4FF',
          borderRadius: 8,
          padding: 12,
          marginBottom: 24
        }}>
          <Shield size={16} color="#1E40AF" />
          <Text style={{
            color: '#1E40AF',
            fontSize: 12,
            marginLeft: 8
          }}>
            Ce transfert est sécurisé par votre empreinte digitale
          </Text>
        </View>
        
        {/* Bouton de confirmation avec empreinte */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#1E40AF',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            borderRadius: 12,
            marginBottom: 12
          }} 
          onPress={handleConfirm}
        >
          <Fingerprint size={20} color="#ffffff" />
          <Text style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8
          }}>Confirmer avec empreinte</Text>
        </TouchableOpacity>
        
        {/* Bouton annuler */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#f3f4f6',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }} 
          onPress={handleBack}
        >
          <Text style={{
            color: '#6B7280',
            fontSize: 14,
            fontWeight: '600'
          }}>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Écran de succès avec animation
  const renderSuccessScreen = () => {
    const scaleAnim = transferAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1.2, 1]
    });
    
    const opacityAnim = transferAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    });
    
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
      }}>
        <Animated.View 
          style={[{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#10B981',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }, {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }]}
        >
          <Check size={40} color="#ffffff" />
        </Animated.View>
        
        <Text style={{
          color: '#111827',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 16,
        }}>Transfert réussi !</Text>
        <Text style={{
          color: '#1E40AF',
          fontSize: 32,
          fontWeight: '800',
          marginBottom: 4,
        }}>{transferData.amount} FC</Text>
        <Text style={{
          color: '#6B7280',
          fontSize: 16,
          marginBottom: 32,
        }}>envoyés à {transferData.recipient}</Text>
        
        <View style={{
          backgroundColor: '#f9fafb',
          borderRadius: 12,
          padding: 16,
          width: '100%',
          marginBottom: 32,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12
          }}>
            <Text style={{
              color: '#6B7280',
              fontSize: 14
            }}>Date</Text>
            <Text style={{
              color: '#111827',
              fontSize: 14,
              fontWeight: '600'
            }}>{new Date().toLocaleDateString('fr-FR')}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <Text style={{
              color: '#6B7280',
              fontSize: 14
            }}>Heure</Text>
            <Text style={{
              color: '#111827',
              fontSize: 14,
              fontWeight: '600'
            }}>{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <Text style={{
              color: '#6B7280',
              fontSize: 14
            }}>Référence</Text>
            <Text style={{
              color: '#111827',
              fontSize: 14,
              fontWeight: '600'
            }}>{`TRF${Math.floor(Math.random() * 1000000)}`}</Text>
          </View>
        </View>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <TouchableOpacity style={{
            flex: 1,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 12,
            marginHorizontal: 6,
          }}>
            <Text style={{
              color: '#6B7280',
              fontSize: 14,
              fontWeight: '600'
            }}>Voir le reçu</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              flex: 1,
              backgroundColor: '#1E40AF',
              borderColor: '#1E40AF',
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 6
            }}
            onPress={handleBack}
          >
            <Text style={{color: '#ffffff', fontSize: 14, fontWeight: '600'}}>Nouveau transfert</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header - Masqué sur l'écran de succès */}
      {!transferSuccess && (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transfert d'argent</Text>
          <View style={styles.headerSpacer} />
        </View>
      )}

      {/* Step Indicator - Masqué sur l'écran de succès */}
      {!transferSuccess && renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Afficher l'écran approprié en fonction de l'état */}
        {!transferSuccess && step === 1 && renderStep1()}
        {!transferSuccess && step === 2 && renderStep2()}
        {transferSuccess && renderSuccessScreen()}
        
        <View style={{ height: 20 }} />
      </ScrollView>
      
      {/* Composant d'authentification biométrique */}
      <BiometricPrompt 
        visible={showBiometric}
        onAuthenticate={handleAuthenticate}
        onCancel={() => setShowBiometric(false)}
        title="Confirmer le transfert"
        subtitle={`Utilisez votre empreinte pour envoyer ${transferData.amount} FC à ${transferData.recipient}`}
      />
      
      {/* Indicateur de chargement */}
      {isLoading && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LoadingSpinner size={48} />
          <Text style={{ marginTop: 16, color: '#1E40AF', fontWeight: '600' }}>
            Traitement en cours...
          </Text>
        </View>
      )}
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
  // Nouveaux styles pour la recherche unifiée
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  searchResults: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  // Badge de type de destinataire
  recipientTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  recipientTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
    marginLeft: 6,
  },
  // Styles pour les contacts récents
  recentContactsContainer: {
    marginBottom: 24,
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
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  frequentContact: {
    borderWidth: 2,
    borderColor: '#10B981',
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
  contactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactPhone: {
    color: '#6b7280',
    fontSize: 12,
  },
  frequentBadge: {
    backgroundColor: '#10B98120',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  frequentBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '600',
  },
  lastTransferBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  lastTransferText: {
    color: '#6B7280',
    fontSize: 11,
    marginLeft: 4,
  },
  quickSendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  quickSendText: {
    color: '#1E40AF',
    fontSize: 11,
    fontWeight: '600',
    marginRight: 4,
  },
  // Styles pour le montant
  amountContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  amountLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
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
  quickAmountButtonActive: {
    backgroundColor: '#1E40AF',
  },
  quickAmountText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickAmountTextActive: {
    color: '#ffffff',
  },
  // Styles pour la note
  noteContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  noteLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',  
    marginBottom: 8,    
  },
  // Styles for confirmation screen
  confirmationDetails: {
    marginTop: 16,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  confirmationLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  confirmationValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '700',
  }
});
