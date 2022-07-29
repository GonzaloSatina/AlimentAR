 use near_sdk::{
    env,
    PromiseResult,
};
/// == TIPOS  ====================================================================
/// Los ID de cuenta en Near son solo cadenas.
pub type AccountId = String;
/// El gas es u64
pub type Gas = u64;
/// Montos, Saldos y Dinero en NEAR son u128.
pub type Amount = u128;
pub type Balance = Amount;
pub type Money = Amount;
/// La marca de tiempo en NEAR es un número
pub type Timestamp = u64;
///
/// == CONSTANTES  ================================================================
///
/// TODO: eevisar MIN_ACCOUNT_BALANCE después de incluir algunos datos reales b/c this
/// podría terminar siendo mucho más alto
/// ONE_NEAR = unidad de token NEAR en yocto Ⓝ (1e24)
pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000 as u128;
/// XCC_GAS = gas para llamadas de contrato cruzado, ~5 Tgas (teragas = 1e12) por "salto"
pub const XCC_GAS: Gas = 20_000_000_000_000;
/// MIN_ACCOUNT_BALANCE = 3 NEAR min para mantener viva la cuenta a través del staking de almacenamiento
pub const MIN_ACCOUNT_BALANCE: u128 = ONE_NEAR * 3;
/// == FUNCIONES  ================================================================
/// Convierte la cantidad de fichas de Yocto Ⓝ en NEAR, como una cadena
pub fn asNEAR(amount: u128) -> String {
    format!("{}", amount / ONE_NEAR)
}
/// Convierte una cantidad en NEAR en tokens Yocto Ⓝ
pub fn toYocto<D: Into<u128>>(amount: D) -> u128 {
    ONE_NEAR * amount.into()
}
/// Afirma que el contrato se ha llamado a sí mismo
pub fn assert_self() {
    let caller = env::predecessor_account_id();
    let current = env::current_account_id();
    assert_eq!(caller, current, "Only this contract may call itself");
}
/// Afirma que solo se recibió una única promesa y fue exitosa
pub fn assert_single_promise_success(){
    assert_eq!(
        env::promise_results_count(),
        1,
        "Expected exactly one promise result",
    );
    match env::promise_result(0) {
        PromiseResult::Successful(_) => return,
        _ => panic!("Expected PromiseStatus to be successful"),
    };
}