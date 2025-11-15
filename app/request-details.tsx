import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { X, Camera, Send, MapPin, User, Clock, XCircle, Car, Heart, Home, Smartphone, ShoppingCart, MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../constants/theme';
import { helpRequests, categoryLabels } from '../utils/mockData';
import { HelpCategory } from '../types';

const { width } = Dimensions.get('window');

const categoryIcons: Record<HelpCategory, any> = {
  car_breakdown: Car,
  first_aid: Heart,
  home_repair: Home,
  tech_support: Smartphone,
  shopping: ShoppingCart,
  other: MoreHorizontal,
};

export default function RequestDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, mode, category } = params;

  const request = id ? helpRequests.find(r => r.id === id) : null;

  if (mode === 'create') {
    return <CreateRequestScreen initialCategory={category as HelpCategory} />;
  }

  if (!request) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>طلب غير موجود</Text>
      </SafeAreaView>
    );
  }

  return <RequestDetailView request={request} />;
}

function CreateRequestScreen({ initialCategory }: { initialCategory?: HelpCategory }) {
  const router = useRouter();
  const [category, setCategory] = useState<HelpCategory | undefined>(initialCategory);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    address: 'شارع الملك فهد، الرياض',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend/API
    console.log({ category, title, description, images, location });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>طلب مساعدة</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>حدد نوع المساعدة</Text>
          <View style={styles.categoriesGrid}>
            {(Object.keys(categoryLabels) as HelpCategory[]).map((cat) => {
              const Icon = categoryIcons[cat];
              const isActive = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryCard, isActive && styles.categoryCardActive]}
                  onPress={() => setCategory(cat)}
                >
                  <View style={[styles.categoryIcon, isActive && styles.categoryIconActive]}>
                    <Icon size={24} color={isActive ? colors.primary : colors.textSecondary} />
                  </View>
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{categoryLabels[cat]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>عنوان الطلب</Text>
          <TextInput
            style={styles.input}
            placeholder="مثال: بطارية السيارة فارغة"
            placeholderTextColor={colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            textAlign="right"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>وصف المشكلة</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="اكتب وصفاً تفصيلياً للمشكلة لمساعدة المتطوع"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlign="right"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>إضافة صور (اختياري)</Text>
          {images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesPreviewContainer}>
              {images.map((uri, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(index)}>
                    <XCircle size={24} color={colors.danger} fill="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Camera size={24} color={colors.primary} />
            <Text style={styles.imageButtonText}>إرفاق صورة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>تحديد الموقع على الخريطة</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
          <Text style={styles.locationText}>الموقع الحالي: {location.address}</Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>إرسال طلب المساعدة</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


function RequestDetailView({ request }: { request: any }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', senderId: request.requesterId, senderName: request.requesterName, message: 'شكراً على قبول الطلب!', timestamp: new Date() },
    { id: '2', senderId: 'helper-1', senderName: 'محمد علي', message: 'في الطريق إليك، سأصل خلال 10 دقائق', timestamp: new Date() },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        senderId: 'current-user',
        senderName: 'أنا',
        message,
        timestamp: new Date(),
      }]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تفاصيل الطلب</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>{request.title}</Text>
          <View style={styles.requestMeta}>
            <View style={styles.metaItem}>
              <User size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{request.requesterName}</Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{request.location.address}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{new Date(request.createdAt).toLocaleString('ar')}</Text>
            </View>
          </View>
          <Text style={styles.requestDescription}>{request.description}</Text>
        </View>

        <View style={styles.chatSection}>
          <Text style={styles.chatTitle}>المحادثة</Text>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageItem, msg.senderId === 'current-user' && styles.messageItemOwn]}>
              <Text style={styles.messageSender}>{msg.senderName}</Text>
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.chatInput}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Send size={20} color={colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          placeholder="اكتب رسالة..."
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
          textAlign="right"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  categoryCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconActive: {
    backgroundColor: '#FFFFFF'
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoryTextActive: {
    fontFamily: 'Cairo_600SemiBold',
    color: colors.primary,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  imageButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.primary,
  },
  imagesPreviewContainer: {
    marginBottom: spacing.md,
  },
  imagePreviewWrapper: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removeImageButton: {
    position: 'absolute',
    top: -spacing.sm,
    left: -spacing.sm,
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationText: {
    textAlign: 'center',
    marginTop: spacing.sm,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: '#FFFFFF',
  },
  requestInfo: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  requestTitle: {
    fontSize: 20,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  requestMeta: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.textSecondary,
  },
  requestDescription: {
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
    lineHeight: 24,
  },
  chatSection: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontFamily: 'Cairo_700Bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  messageItem: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageItemOwn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary + '10',
  },
  messageSender: {
    fontSize: 12,
    fontFamily: 'Cairo_600SemiBold',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    fontFamily: 'Cairo_400Regular',
    color: colors.text,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
