import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Search, Zap, Droplets, Wifi, Tv, Smartphone, Building2 } from 'lucide-react-native';

export default function PaymentsScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'Tous', icon: null },
    { id: 'electricity', title: 'Électricité', icon: Zap, color: '#F59E0B' },
    { id: 'water', title: 'Eau', icon: Droplets, color: '#3B82F6' },
    { id: 'internet', title: 'Internet', icon: Wifi, color: '#8B5CF6' },
    { id: 'tv', title: 'TV/Câble', icon: Tv, color: '#10B981' },
    { id: 'mobile', title: 'Mobile', icon: Smartphone, color: '#EF4444' },
    { id: 'bank', title: 'Banque', icon: Building2, color: '#6B7280' },
  ];

  const providers = [
    {
      id: 1,
      name: 'SNEL',
      category: 'electricity',
      description: 'Société Nationale d\'Électricité',
      icon: '⚡',
      color: '#F59E0B',
      popular: true
    },
    {
      id: 2,
      name: 'REGIDESO',
      category: 'water',
      description: 'Régie de Distribution d\'Eau',
      icon: '💧',
      color: '#3B82F6',
      popular: true
    },
    {
      id: 3,
      name: 'Airtel Congo',
      category: 'mobile',
      description: 'Recharge et factures',
      icon: '📱',
      color: '#EF4444',
      popular: true
    },
    {
      id: 4,
      name: 'Orange RDC',
      category: 'mobile',
      description: 'Recharge et factures',
      icon: '🍊',
      color: '#F97316',
      popular: true
    },
    {
      id: 5,
      name: 'Vodacom Congo',
      category: 'mobile',
      description: 'Recharge et factures',
      icon: '📶',
      color: '#DC2626',
      popular: false
    },
    {
      id: 6,
      name: 'Africell',
      category: 'mobile',
      description: 'Recharge et factures',
      icon: '📞',
      color: '#059669',
      popular: false
    },
    {
      id: 7,
      name: 'DSTV',
      category: 'tv',
      description: 'Télévision satellitaire',
      icon: '📺',
      color: '#7C3AED',
      popular: true
    },
    {
      id: 8,
      name: 'Canal+',
      category: 'tv',
      description: 'Télévision premium',
      icon: '🎬',
      color: '#1F2937',
      popular: false
    },
    {
      id: 9,
      name: 'SCPT Télécom',
      category: 'internet',
      description: 'Internet fixe',
      icon: '🌐',
      color: '#6366F1',
      popular: false
    },
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    const matchesSearch = provider.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularProviders = providers.filter(p => p.popular);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paiements</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un fournisseur..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categoryItemActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon size={16} color={category.color} />
                </View>
              )}
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Providers (only show when "all" is selected and no search) */}
        {selectedCategory === 'all' && !searchText && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Populaires</Text>
            <View style={styles.popularGrid}>
              {popularProviders.slice(0, 4).map((provider) => (
                <TouchableOpacity key={provider.id} style={styles.popularItem}>
                  <View style={[styles.popularIcon, { backgroundColor: provider.color + '20' }]}>
                    <Text style={styles.popularEmoji}>{provider.icon}</Text>
                  </View>
                  <Text style={styles.popularName}>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* All Providers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Tous les fournisseurs' : 
             categories.find(c => c.id === selectedCategory)?.title || 'Fournisseurs'}
          </Text>
          
          {filteredProviders.map((provider) => (
            <TouchableOpacity key={provider.id} style={styles.providerItem}>
              <View style={[styles.providerIcon, { backgroundColor: provider.color + '20' }]}>
                <Text style={styles.providerEmoji}>{provider.icon}</Text>
              </View>
              <View style={styles.providerContent}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerDescription}>{provider.description}</Text>
              </View>
              {provider.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Populaire</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {filteredProviders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Aucun fournisseur trouvé
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Essayez de modifier votre recherche ou choisir une autre catégorie
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryItemActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  categoryText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  popularItem: {
    alignItems: 'center',
    width: '22%',
  },
  popularIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  popularEmoji: {
    fontSize: 24,
  },
  popularName: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  providerItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerEmoji: {
    fontSize: 20,
  },
  providerContent: {
    flex: 1,
  },
  providerName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  providerDescription: {
    color: '#6b7280',
    fontSize: 14,
  },
  popularBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
});