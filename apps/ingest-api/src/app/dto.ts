import { IsEnum, IsNotEmpty } from 'class-validator';

export enum EventType {
  // Authentication & Session Events
  LOGIN = 'user.events.login',
  LOGOUT = 'user.events.logout',
  SIGNUP = 'user.events.signup',
  PASSWORD_RESET = 'user.events.password_reset',
  LOGIN_FAILED = 'user.events.login_failed',
  SESSION_START = 'user.events.session_start',
  SESSION_END = 'user.events.session_end',

  // Profile & Account Events
  PROFILE_UPDATED = 'user.events.profile_updated',
  ACCOUNT_DELETED = 'user.events.account_deleted',
  EMAIL_VERIFIED = 'user.events.email_verified',
  TWO_FA_ENABLED = 'user.events.2fa_enabled',
  TWO_FA_DISABLED = 'user.events.2fa_disabled',

  // Engagement & Activity Events
  PAGE_VIEWED = 'user.events.page_viewed',
  BUTTON_CLICKED = 'user.events.button_clicked',
  SEARCH_PERFORMED = 'user.events.search_performed',
  ITEM_VIEWED = 'user.events.item_viewed',
  ITEM_LIKED = 'user.events.item_liked',
  ITEM_SHARED = 'user.events.item_shared',
  NOTIFICATION_CLICKED = 'user.events.notification_clicked',

  // Billing & Subscription Events
  SUBSCRIPTION_STARTED = 'user.events.subscription_started',
  SUBSCRIPTION_CANCELLED = 'user.events.subscription_cancelled',
  PAYMENT_SUCCESSFUL = 'user.events.payment_successful',
  PAYMENT_FAILED = 'user.events.payment_failed',
  INVOICE_GENERATED = 'user.events.invoice_generated',

  // 🛠️ Security & Settings
  DEVICE_ADDED = 'user.events.device_added',
  DEVICE_REMOVED = 'user.events.device_removed',
  PASSWORD_CHANGED = 'user.events.password_changed',
  PERMISSIONS_UPDATED = 'user.events.permissions_updated',
}

export class EventDto {
  @IsEnum(EventType, { message: 'eventType must be a valid event type' })
  eventType: EventType;

  @IsNotEmpty()
  data: any;
}
