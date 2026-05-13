import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useAuthStore } from "../../store/auth/useAuthStore";

// ─── Screen imports (placeholder screens created below) ──────────────────────
import LoginScreen from "../../features/auth/screens/LoginScreen";
import TermsScreen from "../../features/auth/screens/TermsScreen";
import RegisterPersonalScreen from "../../features/auth/screens/RegisterPersonalScreen";
import RegisterAcademicScreen from "../../features/auth/screens/RegisterAcademicScreen";
import RegisterCredentialsScreen from "../../features/auth/screens/RegisterCredentialsScreen";

import InstrumentsScreen from "../../features/evaluations/screens/InstrumentsScreen";
import HistoryScreen from "../../features/history/screens/HistoryScreen";

// ─── Param Lists ──────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  RegisterTerms: { registerData: any };
  RegisterPersonal: undefined;
  RegisterAcademic: { personalData: any };
  RegisterCredentials: { personalData: any, academicData: any };
};

import DashboardScreen from "../../features/dashboard/screens/DashboardScreen";
import EditProfileScreen from "../../features/profile/screens/EditProfileScreen";
import CalendarScreen from "../../features/care/screens/CalendarScreen";
import ConfirmationScreen from "../../features/care/screens/ConfirmationScreen";

export type CareStackParamList = {
  Calendar: undefined;
  ConfirmAppointment: { date: string };
};

const CareStack = createNativeStackNavigator<CareStackParamList>();

function CareNavigator() {
  return (
    <CareStack.Navigator screenOptions={{ headerShown: false }}>
      <CareStack.Screen name="Calendar" component={CalendarScreen} />
      <CareStack.Screen name="ConfirmAppointment" component={ConfirmationScreen} />
    </CareStack.Navigator>
  );
}

import AppointmentsListScreen from "../../features/care/screens/AppointmentsListScreen";
import AppointmentDetailScreen from "../../features/care/screens/AppointmentDetailScreen";

export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
  AppointmentDetail: { date: string };
};

const AppointmentsStack = createNativeStackNavigator<AppointmentsStackParamList>();

function AppointmentsNavigator() {
  return (
    <AppointmentsStack.Navigator screenOptions={{ headerShown: false }}>
      <AppointmentsStack.Screen name="AppointmentsList" component={AppointmentsListScreen} />
      <AppointmentsStack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
    </AppointmentsStack.Navigator>
  );
}

export type HistoryStackParamList = {
  HistoryList: undefined;
  HistoryDetail: { date: string, depression: number, anxiety: number };
};

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

import HistoryDetailScreen from "../../features/history/screens/HistoryDetailScreen";

function HistoryNavigator() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryList" component={HistoryScreen} />
      <HistoryStack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </HistoryStack.Navigator>
  );
}

export type MainTabParamList = {
  Home: undefined;
  Evaluaciones: undefined;
  History: undefined;
  Atencion: undefined;
  Citas: undefined;
  Profile: undefined;
};

// ─── Navigators ───────────────────────────────────────────────────────────────

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// ─── Auth Stack ───────────────────────────────────────────────────────────────

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="RegisterTerms" component={TermsScreen} />
      <AuthStack.Screen name="RegisterPersonal" component={RegisterPersonalScreen} />
      <AuthStack.Screen name="RegisterAcademic" component={RegisterAcademicScreen} />
      <AuthStack.Screen name="RegisterCredentials" component={RegisterCredentialsScreen} />
    </AuthStack.Navigator>
  );
}

// ─── Main Tab Navigator ───────────────────────────────────────────────────────

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Home: "home",
  Evaluaciones: "file-document-outline",
  History: "file-clock-outline",
  Atencion: "map-marker-path",
  Citas: "calendar-month-outline",
  Profile: "account",
};

import QuestionnaireScreen from "../../features/evaluations/screens/QuestionnaireScreen";
import ResultScreen from "../../features/evaluations/screens/ResultScreen";

export type EvaluationsStackParamList = {
  InstrumentsList: undefined;
  Questionnaire: { formId: string };
  Result: undefined;
};

export type ProfileStackParamList = {
  ProfileDetail: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileDetail" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const EvaluationsStack = createNativeStackNavigator<EvaluationsStackParamList>();

function EvaluationsNavigator() {
  return (
    <EvaluationsStack.Navigator screenOptions={{ headerShown: false }}>
      <EvaluationsStack.Screen name="InstrumentsList" component={InstrumentsScreen} />
      <EvaluationsStack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <EvaluationsStack.Screen name="Result" component={ResultScreen} />
    </EvaluationsStack.Navigator>
  );
}

function MainNavigator() {
  const theme = useTheme();

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#293489',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
        tabBarStyle: {
          display: route.name === 'Home' ? 'none' : 'flex',
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
          elevation: 20,
          shadowOpacity: 0.1,
          height: 64,
          alignItems: 'center',
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={TAB_ICONS[route.name as keyof MainTabParamList]}
            size={30}
            color={color}
          />
        ),
      })}
    >
      <MainTab.Screen name="Home" component={DashboardScreen} />
      <MainTab.Screen name="Evaluaciones" component={EvaluationsNavigator} />
      <MainTab.Screen name="History" component={HistoryNavigator} />
      <MainTab.Screen name="Atencion" component={CareNavigator} />
      <MainTab.Screen name="Citas" component={AppointmentsNavigator} />
      <MainTab.Screen name="Profile" component={ProfileNavigator} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />
    </MainTab.Navigator>
  );
}

// ─── Splash / Checking screen ─────────────────────────────────────────────────

function SplashScreen() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────

export default function RootNavigator() {
  const status = useAuthStore((s) => s.status);
  const restoreSession = useAuthStore((s) => s.restoreSession);

  React.useEffect(() => {
    restoreSession();
  }, []);

  return (
    <NavigationContainer>
      {status === "checking"       && <SplashScreen />}
      {status === "guest"          && <AuthNavigator />}
      {status === "authenticated"  && <MainNavigator />}
    </NavigationContainer>
  );
}
