import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ListFilter as Filter, Download, ArrowUpRight, ArrowDownRight, RotateCcw, Calendar } from 'lucide-react-native';

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const filters = [
    { id: 'all', title: 'Tous' },
    { id: 'sent', title: 'Envoyés' },
    { id: 'received', title: 'Reçus' },
    { id: 'payments', title: 'Paiements' },
  ];

  const periods = [
    { id: 'week', title: 'Cette semaine' },
    { id: 'month', title: 'Ce mois' },
    { id: 'quarter', title: '3 mois' },
    { id: 'year', title: 'Cette année' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'sent',
      title: 'Transfer vers Marie Kabila',
      subtitle: '+243 89X XXX XXX',
      amount: '-25,000 FC',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      reference: 'TRF240115001'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement SNEL',
      subtitle: 'Facture électricité',
      amount: '-15,750 FC',
      date: '2024-01-15',
      time: '12:15',
      status: 'completed',
      reference: 'PAY240115002'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Recharge Airtel',
      subtitle: '+243 89X XXX XXX',
      amount: '-5,000 FC',
      date: '2024-01-15',
      time: '10:45',
      status: 'completed',
      reference: 'RCH240115003'
    },
    {
      id: 4,
      type: 'received',
      title: 'Transfer de Joseph Mukendi',
      subtitle: '+243 97X XXX XXX',
      amount: '+50,000 FC',
      date: '2024-01-14',
      time: '16:22',
      status: 'completed',
      reference: 'TRF240114004'
    },
    {
      id: 5,
      type: 'sent',
      title: 'Transfer vers Grace Mbuyi',
      subtitle: '+243 85X XXX XXX',
      amount: '-12,500 FC',
      date: '2024-01-14',
      time: '09:15',
      status: 'pending',
      reference: 'TRF240114005'
    },
    {
      id: 6,
      type: 'payment',
      title: 'Paiement REGIDESO',
      subtitle: 'Facture eau',
      amount: '-8,200 FC',
      date: '2024-01-13',
      time: '11:30',
      status: 'completed',
      reference: 'PAY240113006'
    },
    {
      id: 7,
      type: 'payment',
      title: 'DSTV Abonnement',
      subtitle: 'Bouquet Premium',
      amount: '-45,000 FC',
      date: '2024-01-12',
      time: '14:45',
      status: 'completed',
      reference: 'PAY240112007'
    },
    {
      id: 8,
      type: 'received',
      title: 'Remboursement frais',
      subtitle: 'First Bank DRC',
      amount: '+2,500 FC',
      date: '2024-01-12',
      time: '08:20',
      status: 'completed',
      reference: 'REF240112008'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'sent') return transaction.type === 'sent';
    if (selectedFilter === 'received') return transaction.type === 'received';
    if (selectedFilter === 'payments') return transaction.type === 'payment';
    return true;
  });

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') {
      return <RotateCcw size={20} color="#F59E0B" />;
    }
    
    switch (type) {
      case 'sent':
        return <ArrowUpRight size={20} color="#EF4444" />;
      case 'received':
        return <ArrowDownRight size={20} color="#10B981" />;
      case 'payment':
        return <ArrowUpRight size={20} color="#6366F1" />;
      default:
        return <ArrowUpRight size={20} color="#6B7280" />;
    }
  };

  const getTransactionIconBg = (type: string, status: string) => {
    if (status === 'pending') {
      return '#FEF3C7';
    }
    
    switch (type) {
      case 'sent':
        return '#FEE2E2';
      case 'received':
        return '#DCFCE7';
      case 'payment':
        return '#E0E7FF';
      default:
        return '#F3F4F6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En cours';
      case 'failed':
        return 'Échec';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const groupTransactionsByDate = (transactions: any[]) => {
    const groups: { [key: string]: any[] } = {};
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });
    
    return groups;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color="#1E40AF" />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.periodContainer}
      >
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodItem,
              selectedPeriod === period.id && styles.periodItemActive
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Calendar size={14} color={selectedPeriod === period.id ? '#ffffff' : '#6B7280'} />
            <Text style={[
              styles.periodText,
              selectedPeriod === period.id && styles.periodTextActive
            ]}>
              {period.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              selectedFilter === filter.id && styles.filterItemActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.title}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color="#6B7280" />
          <Text style={styles.filterButtonText}>Filtres</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>-92,450 FC</Text>
          <Text style={styles.summaryLabel}>Dépenses</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>+52,500 FC</Text>
          <Text style={styles.summaryLabel}>Reçus</Text>
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.keys(groupedTransactions)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((date) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{formatDate(date)}</Text>
              
              {groupedTransactions[date].map((transaction) => (
                <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: getTransactionIconBg(transaction.type, transaction.status) }
                  ]}>
                    {getTransactionIcon(transaction.type, transaction.status)}
                  </View>
                  
                  <View style={styles.transactionContent}>
                    <View style={styles.transactionHeader}>
                      <Text style={styles.transactionTitle}>{transaction.title}</Text>
                      <Text style={[
                        styles.transactionAmount,
                        { color: transaction.amount.startsWith('+') ? '#10B981' : '#111827' }
                      ]}>
                        {transaction.amount}
                      </Text>
                    </View>
                    
                    <View style={styles.transactionFooter}>
                      <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                      <View style={styles.transactionMeta}>
                        <Text style={styles.transactionTime}>{transaction.time}</Text>
                        <View style={styles.statusDot}>
                          <View style={[
                            styles.statusIndicator,
                            { backgroundColor: getStatusColor(transaction.status) }
                          ]} />
                          <Text style={[
                            styles.statusText,
                            { color: getStatusColor(transaction.status) }
                          ]}>
                            {getStatusText(transaction.status)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.transactionReference}>Réf: {transaction.reference}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        
        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Aucune transaction trouvée
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Modifiez vos filtres pour voir plus de résultats
            </Text>
          </View>
        )}
        
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
    justifyContent: 'space-between',
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
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  periodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  periodItemActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  periodText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  periodTextActive: {
    color: '#ffffff',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  filterItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterItemActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  filterText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionSubtitle: {
    color: '#6b7280',
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTime: {
    color: '#9ca3af',
    fontSize: 10,
    marginRight: 8,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  transactionReference: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
});