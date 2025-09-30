import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Image } from 'react-native';
import { Eye, EyeOff, Send, Receipt, Smartphone, Plus, Bell, User, Lock, ArrowUpRight, ArrowDownRight, Zap, Droplets, Tv, ChevronRight, TrendingUp, AlertCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Jean-Claude');

  // Données pour le mini-graphique (simulées)
  const [monthlySpending, setMonthlySpending] = useState({
    current: 247850, // en FC
    budget: 350000, // en FC
    percentage: 70, // pourcentage du budget utilisé
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  // Actions rapides personnalisées basées sur l'historique de l'utilisateur
  const quickActions = [
    { id: 1, icon: Send, title: 'Envoyer à Marie', subtitle: 'Transfer rapide', color: '#1E40AF', route: 'transfer' },
    { id: 2, icon: Receipt, title: 'Payer SNEL', subtitle: 'Facture électricité', color: '#059669', route: 'payments' },
    { id: 3, icon: Smartphone, title: 'Recharger Airtel', subtitle: 'Crédit téléphone', color: '#7C3AED', route: 'recharge' },
    { id: 4, icon: Tv, title: 'DSTV', subtitle: 'Abonnement TV', color: '#F59E0B', route: 'payments' },
    { id: 5, icon: Droplets, title: 'REGIDESO', subtitle: 'Facture eau', color: '#3B82F6', route: 'payments' },
    { id: 6, icon: Plus, title: 'Plus', subtitle: 'Autres services', color: '#6B7280', route: 'more' },
  ];

  const recentTransactions = [
    { id: 1, type: 'transfer', title: 'Marie Kabila', subtitle: '+243 89X XXX XXX', amount: '-25,000 FC', time: '14:30', status: 'completed' },
    { id: 2, type: 'payment', title: 'Paiement SNEL', subtitle: 'Facture électricité', amount: '-15,750 FC', time: '12:15', status: 'completed' },
    { id: 3, type: 'received', title: 'Joseph Mukendi', subtitle: '+243 97X XXX XXX', amount: '+50,000 FC', time: '16:22', status: 'completed' },
  ];

  // Type pour les éléments de découverte
  type DiscoverItem = {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: React.ElementType;
  };

  // Nouveaux services et promotions
  const discoverItems: DiscoverItem[] = [
    { 
      id: 1, 
      title: 'Prêt Express', 
      description: 'Obtenez jusqu à 500000 FC en 24h', 
      color: '#1E40AF',
      icon: TrendingUp
    },
    { 
      id: 2, 
      title: 'Épargne Automatique', 
      description: 'Épargnez sans y penser', 
      color: '#059669',
      icon: Zap
    },
  ];

  const getTransactionIcon = (type: 'transfer' | 'received' | 'payment' | string) => {
    switch (type) {
      case 'transfer':
        return <ArrowUpRight size={18} color="#EF4444" />;
      case 'received':
        return <ArrowDownRight size={18} color="#10B981" />;
      case 'payment':
        return <Receipt size={18} color="#6366F1" />;
      default:
        return <ArrowUpRight size={18} color="#6B7280" />;
    }
  };

  const getTransactionBackground = (type: 'transfer' | 'received' | 'payment' | string): string => {
    switch (type) {
      case 'transfer':
        return '#FEE2E2';
      case 'received':
        return '#DCFCE7';
      case 'payment':
        return '#E0E7FF';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#003366" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Lock size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card with Mini Graph */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Solde principal</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? (
                <EyeOff size={20} color="#6b7280" />
              ) : (
                <Eye size={20} color="#6b7280" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? '247,850 FC' : '••••••• FC'}
          </Text>
          <Text style={styles.balanceSubtext}>
            USD: {balanceVisible ? '$148.50' : '$•••••'}
          </Text>
          
          {/* Mini Graph */}
          <View style={styles.miniGraphContainer}>
            <View style={styles.miniGraphLabels}>
              <Text style={styles.miniGraphTitle}>Dépenses du mois</Text>
              <Text style={styles.miniGraphValue}>
                {balanceVisible ? `${monthlySpending.current.toLocaleString()} FC / ${monthlySpending.budget.toLocaleString()} FC` : '•••••• FC / •••••• FC'}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${monthlySpending.percentage}%` }]} />
            </View>
          </View>
          
          <TouchableOpacity style={styles.viewHistoryButton}>
            <Text style={styles.viewHistoryText}>Voir l'historique</Text>
            <ChevronRight size={16} color="#1E40AF" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions - Grid with 2 rows */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Mes actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.slice(0, 3).map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.quickActionsGrid}>
            {quickActions.slice(3, 6).map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Dernières transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: getTransactionBackground(transaction.type) }]}>
                  {getTransactionIcon(transaction.type)}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, 
                  { color: transaction.amount.startsWith('+') ? '#10B981' : '#111827' }]}>
                  {transaction.amount}
                </Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Discover Section */}
        <View style={styles.discoverContainer}>
          <Text style={styles.sectionTitle}>Découvrir</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.discoverScroll}>
            {discoverItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.discoverCard}>
                <View style={[styles.discoverIconContainer, { backgroundColor: item.color }]}>
                  <item.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.discoverTitle}>{item.title}</Text>
                <Text style={styles.discoverDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <AlertCircle size={16} color="#1E40AF" />
          <Text style={styles.securityText}>Transactions sécurisées et certifiées PCI DSS</Text>
        </View>

        {/* Bottom spacing for tab bar */}
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
    backgroundColor: '#003366', // Bleu First Bank
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: -10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  balanceSubtext: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  miniGraphContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  miniGraphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  miniGraphTitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  miniGraphValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2E8B57', // Vert émeraude
    borderRadius: 4,
  },
  viewHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewHistoryText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionTitle: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    color: '#6b7280',
    fontSize: 11,
    textAlign: 'center',
  },
  transactionsContainer: {
    marginBottom: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  transactionTime: {
    color: '#9ca3af',
    fontSize: 10,
  },
  discoverContainer: {
    marginBottom: 24,
  },
  discoverScroll: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  discoverCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  discoverIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  discoverTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  discoverDescription: {
    color: '#6b7280',
    fontSize: 12,
    lineHeight: 18,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  securityText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
});