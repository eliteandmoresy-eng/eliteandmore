import { CartItem, CheckoutFormData } from '@/types';
import { formatSYP, formatUSD } from './utils';

interface OrderData {
  items: CartItem[];
  form: CheckoutFormData;
  subtotal: number;
  shippingCost: number;
  total: number;
  exchangeRate: number;
  freeShipping: boolean;
}

export function buildOrderMessage(order: OrderData): string {
  const { items, form, subtotal, shippingCost, total, exchangeRate, freeShipping } = order;

  const itemsText = items
    .map((item) => {
      const variantLine = item.variant_label ? `\n     - ${item.variant_label}` : '';
      const unitPrice = formatSYP(item.price_syp);
      const lineTotal = formatSYP(item.price_syp * item.quantity);
      return `▪️ ${item.name}${variantLine}\n     الكمية: ${item.quantity} × ${unitPrice} = ${lineTotal}`;
    })
    .join('\n');

  const paymentText =
    form.payment_method === 'cod' ? 'الدفع عند الاستلام' : 'شام كاش';

  const notesLine = form.notes ? `📝 ملاحظات: ${form.notes}\n` : '';
  const freeShippingLine = freeShipping ? '\n✅ شحن مجاني!' : '';

  return `🦋 *طلب جديد - Elite and More* 🦋

━━━━━━━━━━━━━━━━━━━━━━
*بيانات الزبون:*
👤 الاسم: ${form.full_name}
📞 الهاتف: ${form.phone}
📍 المحافظة: ${form.governorate_name}
🏠 العنوان: ${form.address}
${notesLine}
━━━━━━━━━━━━━━━━━━━━━━
*المنتجات:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━
*الحساب:*
💰 مجموع المنتجات: ${formatSYP(subtotal)} (${formatUSD(subtotal, exchangeRate)})
🚚 تكلفة الشحن: ${freeShipping ? 'مجاني 🎉' : formatSYP(shippingCost)}${freeShippingLine}
💵 *الإجمالي: ${formatSYP(total)} (${formatUSD(total, exchangeRate)})*

💳 طريقة الدفع: ${paymentText}${form.payment_method === 'sham_cash' ? '\n📲 سيتم إرسال المبلغ عبر شام كاش.' : ''}
━━━━━━━━━━━━━━━━━━━━━━
شكراً لثقتكم بـ Elite and More 🦋`;
}

export function getWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
