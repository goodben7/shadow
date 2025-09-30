import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react-native';

interface Transaction {
  id: number;
  type: 'transfer' | 'payment' | 'received';
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionCard({ transaction, onPress }: TransactionCardProps) {
  const getIcon = () => {
    switch (transaction.type) {
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

  const getIconBackground = () => {
    switch (transaction.type) {
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

  const getStatusColor = () => {
    switch (transaction.status) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: getIconBackground() }]}>
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text style={[
            styles.amount,
            { color: transaction.amount.startsWith('+') ? '#10B981' : '#111827' }
          ]}>
            {transaction.amount}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.subtitle} numberOfLines={1}>
            {transaction.subtitle}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.time}>{transaction.time}</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#9ca3af',
    fontSize: 10,
    marginRight: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});