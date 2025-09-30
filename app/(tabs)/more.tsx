import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { User, Settings, Circle as HelpCircle, FileText, Shield, Bell, MapPin, Languages, Moon, LogOut, ChevronRight, Headphones, CreditCard, Gift } from 'lucide-react-native';

export default function MoreScreen() {
  const menuSections = [
    {
      title: 'Compte',
      items: [
        { id: 'profile', icon: User, title: 'Mon profil', subtitle: 'Gérer vos informations' },
        { id: 'cards', icon: CreditCard, title: 'Mes cartes', subtitle: 'Cartes virtuelles et physiques' },
        { id: 'rewards', icon: Gift, title: 'Récompenses', subtitle: 'Points de fidélité' },
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { id: 'notifications', icon: Bell, title: 'Notifications', subtitle: 'Gérer les alertes' },
        { id: 'security', icon: Shield, title: 'Sécurité', subtitle: 'PIN, empreinte, 2FA' },
        { id: 'language', icon: Languages, title: 'Langue', subtitle: 'Français, Lingala, Swahili' },
        { id: 'theme', icon: Moon, title: 'Thème', subtitle: 'Clair, sombre, automatique' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: HelpCircle, title: 'Centre d\'aide', subtitle: 'FAQ et guides' },
        { id: 'support', icon: Headphones, title: 'Contacter le support', subtitle: 'Chat en direct' },
        { id: 'branches', icon: MapPin, title: 'Agences proches', subtitle: 'Localiser nos agences' },
        { id: 'legal', icon: FileText, title: 'Mentions légales', subtitle: 'CGU, politique de confidentialité' },
      ]
    }
  ];

  const handleItemPress = (itemId: string) => {
    switch (itemId) {
      case 'profile':
        Alert.alert('Profil', 'Redirection vers le profil utilisateur');
        break;
      case 'security':
        Alert.alert('Sécurité', 'Paramètres de sécurité');
        break;
      case 'help':
        Alert.alert('Aide', 'Centre d\'aide FirstMonie');
        break;
      case 'support':
        Alert.alert('Support', 'Chat avec notre équipe support');
        break;
      case 'branches':
        Alert.alert('Agences', 'Localisation des agences First Bank DRC');
        break;
      case 'logout':
        Alert.alert(
          'Déconnexion',
          'Êtes-vous sûr de vouloir vous déconnecter ?',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Se déconnecter', style: 'destructive', onPress: () => {} }
          ]
        );
        break;
      default:
        Alert.alert('En cours', 'Fonctionnalité en développement');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plus</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <TouchableOpacity style={styles.profileCard} onPress={() => handleItemPress('profile')}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JC</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jean-Claude Mukendi</Text>
            <Text style={styles.profileEmail}>j.mukendi@example.com</Text>
            <Text style={styles.profilePhone}>+243 89X XXX XXX</Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>Premium</Text>
          </View>
        </TouchableOpacity>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.menuItemLast
                ]}
                onPress={() => handleItemPress(item.id)}
              >
                <View style={styles.menuItemIcon}>
                  <item.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <MapPin size={16} color="#1E40AF" />
            <Text style={styles.quickActionText}>Agences</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <HelpCircle size={16} color="#1E40AF" />
            <Text style={styles.quickActionText}>Aide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Headphones size={16} color="#1E40AF" />
            <Text style={styles.quickActionText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>FirstMonie v2.1.0</Text>
          <Text style={styles.appInfoText}>First Bank DRC © 2024</Text>
          <Text style={styles.appInfoSubtext}>
            Application certifiée PCI DSS et sécurisée
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => handleItemPress('logout')}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  profileEmail: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 2,
  },
  profilePhone: {
    color: '#6b7280',
    fontSize: 14,
  },
  profileBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  profileBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  appInfoText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  appInfoSubtext: {
    color: '#9CA3AF',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});